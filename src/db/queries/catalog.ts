/*
 * Catalog reads for the storefront. Pages read products and categories only
 * through these functions.
 *
 * Each function is cached with "use cache" so pages stay prerendered under
 * Cache Components. Products use a short lifetime so stock stays fairly fresh;
 * call revalidateTag("catalog") after changing catalog data to refresh sooner.
 */
import { and, asc, desc, eq, ne, sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

import { db } from "@/db";
import { categories, productImages, products } from "@/db/schema";
import { toStock, type Category, type Product } from "@/lib/catalog";

export const CATALOG_TAG = "catalog";

type ProductRow = typeof products.$inferSelect & {
  category: typeof categories.$inferSelect;
  images: (typeof productImages.$inferSelect)[];
};

function toProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    name: row.name,
    category: row.category.name,
    categorySlug: row.category.slug,
    priceCents: row.priceCents,
    isNew: row.isNew,
    colour: row.colour,
    description: row.description,
    details: row.details,
    sizes: row.sizes && row.sizes.length > 0 ? row.sizes : null,
    stock: toStock(row.stockQuantity),
    images: row.images.map((image) => ({
      src: image.url,
      alt: image.alt,
      credit: image.creditUrl ?? undefined,
    })),
  };
}

/** Relations every product read needs: its category and images in display order. */
const withCategoryAndImages = {
  category: true as const,
  images: { orderBy: [asc(productImages.position)] },
};

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CATALOG_TAG);

  const rows = await db.select().from(categories).orderBy(asc(categories.sortOrder), asc(categories.id));

  return rows.map((row) => ({
    slug: row.slug,
    name: row.name,
    image: row.imageUrl ? { src: row.imageUrl, alt: row.imageAlt ?? row.name } : null,
  }));
}

export async function getProductSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(CATALOG_TAG);

  const rows = await db
    .select({ slug: products.slug })
    .from(products)
    .where(eq(products.isActive, true))
    .orderBy(asc(products.id));

  return rows.map((row) => row.slug);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag(CATALOG_TAG);

  const row = await db.query.products.findFirst({
    where: and(eq(products.slug, slug), eq(products.isActive, true)),
    with: withCategoryAndImages,
  });

  return row ? toProduct(row) : null;
}

/** Products flagged as new first, then the most recently added. */
export async function getNewArrivals(limit = 8): Promise<Product[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(CATALOG_TAG);

  const rows = await db.query.products.findMany({
    where: eq(products.isActive, true),
    orderBy: [desc(products.isNew), desc(products.createdAt), asc(products.id)],
    limit,
    with: withCategoryAndImages,
  });

  return rows.map(toProduct);
}

/** The homepage "Most wanted" row. */
export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(CATALOG_TAG);

  const rows = await db.query.products.findMany({
    where: and(eq(products.isActive, true), eq(products.isFeatured, true)),
    orderBy: [asc(products.id)],
    limit,
    with: withCategoryAndImages,
  });

  return rows.map(toProduct);
}

/** Same-category products first, then the rest of the catalog. */
export async function getRelatedProducts(
  slug: string,
  categorySlug: string,
  limit = 4,
): Promise<Product[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(CATALOG_TAG);

  const sameCategory = sql`${products.categoryId} = (select ${categories.id} from ${categories} where ${categories.slug} = ${categorySlug})`;

  const rows = await db.query.products.findMany({
    where: and(eq(products.isActive, true), ne(products.slug, slug)),
    orderBy: [sql`${sameCategory} desc`, asc(products.id)],
    limit,
    with: withCategoryAndImages,
  });

  return rows.map(toProduct);
}
