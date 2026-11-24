/*
 * Load the sample catalog into the database: `npm run db:seed`.
 *
 * Safe to run repeatedly. Categories and products are upserted by slug, and
 * each product's images are replaced. Stock quantities are reset to the seed
 * values.
 */
import { loadEnvConfig } from "@next/env";

// Must run before the db client is imported, because it reads DATABASE_URL on load.
loadEnvConfig(process.cwd());

async function main() {
  const { getTableColumns, inArray, sql } = await import("drizzle-orm");
  const { db } = await import("./index");
  const { categories, productImages, products } = await import("./schema");
  const { seedCategories, seedProducts } = await import("./seed-data");

  // `excluded.<column>` for every column we set, so a re-run overwrites with seed values.
  function excludedSet<T extends Record<string, { name: string }>>(columns: T, keys: (keyof T)[]) {
    return Object.fromEntries(keys.map((key) => [key, sql.raw(`excluded."${columns[key].name}"`)]));
  }

  const categoryRows = await db
    .insert(categories)
    .values(
      seedCategories.map((category, index) => ({
        slug: category.slug,
        name: category.name,
        imageUrl: category.image?.src ?? null,
        imageAlt: category.image?.alt ?? null,
        sortOrder: index,
      })),
    )
    .onConflictDoUpdate({
      target: categories.slug,
      set: excludedSet(getTableColumns(categories), ["name", "imageUrl", "imageAlt", "sortOrder"]),
    })
    .returning({ id: categories.id, slug: categories.slug });

  const categoryIds = new Map(categoryRows.map((row) => [row.slug, row.id]));

  const productRows = await db
    .insert(products)
    .values(
      seedProducts.map((product) => {
        const categoryId = categoryIds.get(product.categorySlug);
        if (!categoryId) throw new Error(`Unknown category "${product.categorySlug}" for ${product.slug}`);
        return {
          categoryId,
          slug: product.slug,
          name: product.name,
          description: product.description,
          details: product.details,
          colour: product.colour,
          priceCents: product.priceCents,
          sizes: product.sizes,
          stockQuantity: product.stockQuantity,
          isNew: product.isNew,
          isFeatured: product.isFeatured,
          isActive: true,
        };
      }),
    )
    .onConflictDoUpdate({
      target: products.slug,
      set: {
        ...excludedSet(getTableColumns(products), [
          "categoryId",
          "name",
          "description",
          "details",
          "colour",
          "priceCents",
          "sizes",
          "stockQuantity",
          "isNew",
          "isFeatured",
          "isActive",
        ]),
        updatedAt: sql`now()`,
      },
    })
    .returning({ id: products.id, slug: products.slug });

  const productIds = new Map(productRows.map((row) => [row.slug, row.id]));

  const images = seedProducts.flatMap((product) =>
    product.images.map((image, position) => ({
      productId: productIds.get(product.slug)!,
      url: image.src,
      alt: image.alt,
      creditUrl: image.credit ?? null,
      position,
    })),
  );

  // Replace images in one batch, which runs as a single transaction on neon-http.
  await db.batch([
    db.delete(productImages).where(inArray(productImages.productId, [...productIds.values()])),
    db.insert(productImages).values(images),
  ]);

  console.log(
    `Seeded ${categoryRows.length} categories, ${productRows.length} products, ${images.length} images.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
