import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { PurchasePanel } from "@/components/product/purchase-panel";
import { StockStatus } from "@/components/product/stock-status";
import { SectionHeading } from "@/components/section-heading";
import { getProductBySlug, getProductSlugs, getRelatedProducts } from "@/db/queries/catalog";
import { formatPrice } from "@/lib/catalog";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} | Atelier`,
    description: product.description,
    openGraph: { images: [{ url: product.images[0].src, alt: product.images[0].alt }] },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.slug, product.categorySlug, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => image.src),
    category: product.category,
    color: product.colour,
    offers: {
      "@type": "Offer",
      price: (product.priceCents / 100).toFixed(2),
      priceCurrency: "USD",
      availability:
        product.stock.status === "sold_out"
          ? "https://schema.org/OutOfStock"
          : product.stock.status === "low_stock"
            ? "https://schema.org/LimitedAvailability"
            : "https://schema.org/InStock",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <nav aria-label="Breadcrumb" className="container-page py-4 md:py-6">
        <ol className="flex flex-wrap items-center gap-2 text-caption text-muted">
          <li>
            <Link href="/" className="link-quiet hover:text-ink">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/${product.categorySlug}`} className="link-quiet hover:text-ink">
              {product.category}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="container-page grid gap-8 lg:grid-cols-12 lg:gap-(--grid-gap-x)">
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:col-span-5 lg:self-start lg:pl-10 xl:pl-20">
          <Link href={`/${product.categorySlug}`} className="caps link-quiet text-muted">
            {product.category}
          </Link>
          <h1 className="mt-3 text-h2">{product.name}</h1>
          <p className="mt-4 text-lead">{formatPrice(product.priceCents)}</p>

          <div className="mt-6 flex flex-col gap-2 border-t pt-6">
            <StockStatus stock={product.stock} />
            <p className="text-body-sm text-muted">
              Colour <span className="ml-1 text-ink">{product.colour}</span>
            </p>
          </div>

          <div className="mt-8">
            <PurchasePanel sizes={product.sizes} stock={product.stock} />
          </div>

          <ul className="mt-8 flex flex-col gap-2 text-caption text-muted">
            <li>Complimentary express delivery and returns</li>
            <li>Signature packaging on every order</li>
          </ul>

          <div className="mt-10 border-b">
            <Accordion title="Description" defaultOpen>
              <p>{product.description}</p>
            </Accordion>
            <Accordion title="Details and care">
              <ul className="flex list-disc flex-col gap-1 pl-5">
                {product.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </Accordion>
            <Accordion title="Delivery and returns">
              <p>
                Orders ship within two business days by express courier. Returns are free within 30
                days of delivery, in original condition with tags attached.
              </p>
            </Accordion>
          </div>
        </div>
      </div>

      <section className="container-page section mt-8 border-t md:mt-12" aria-label="You may also like">
        <SectionHeading eyebrow="Continue browsing" title="You May Also Like" />
        <div className="grid-products">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
    </main>
  );
}

function Accordion({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details className="group border-t" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between py-5 [&::-webkit-details-marker]:hidden">
        <span className="caps">{title}</span>
        <span aria-hidden="true" className="relative size-3">
          <span className="absolute inset-x-0 top-1/2 h-px bg-ink" />
          <span className="absolute inset-y-0 left-1/2 w-px bg-ink transition-transform group-open:scale-y-0" />
        </span>
      </summary>
      <div className="pb-6 text-body-sm text-ink-soft">{children}</div>
    </details>
  );
}
