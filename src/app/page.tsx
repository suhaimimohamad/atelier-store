import Image from "next/image";
import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { getCategories, getFeaturedProducts, getNewArrivals } from "@/db/queries/catalog";
import { collections, editorial, hero } from "@/lib/catalog";

export default async function Home() {
  const [newArrivals, mostWanted, allCategories] = await Promise.all([
    getNewArrivals(8),
    getFeaturedProducts(6),
    getCategories(),
  ]);
  // Category tiles need an image; show the first four in sort order.
  const categoryTiles = allCategories.flatMap((category) =>
    category.image ? [{ ...category, image: category.image }] : [],
  ).slice(0, 4);

  return (
    <main>
      <Hero />

      <section className="container-page section" aria-label="New arrivals">
        <SectionHeading
          eyebrow="Just in"
          title="New Arrivals"
          link={{ label: "View all", href: "/new" }}
        />
        <div className="grid-products">
          {newArrivals.map((product, index) => (
            <div key={product.slug} className={index >= 6 ? "hidden lg:block" : undefined}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <Editorial />

      <section className="container-page section" aria-label="Collections">
        <SectionHeading eyebrow="Collections" title="Three Moods for the Season" />
        <div className="grid gap-x-(--grid-gap-x) gap-y-10 md:grid-cols-3">
          {collections.map((collection) => (
            <Link key={collection.slug} href={`/collections/${collection.slug}`} className="group block">
              <div className="relative aspect-portrait overflow-hidden bg-surface">
                <Image
                  src={collection.image.src}
                  alt={collection.image.alt}
                  fill
                  sizes="(min-width: 48rem) 33vw, 100vw"
                  className="object-cover transition-transform duration-1000 ease-luxe group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="text-h3">{collection.name}</h3>
                <span className="caps link shrink-0">Discover</span>
              </div>
              <p className="mt-1 text-body-sm text-muted">{collection.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section border-y bg-surface" aria-label="Most wanted">
        <div className="container-page">
          <SectionHeading
            eyebrow="Most wanted"
            title="Pieces Clients Return For"
            link={{ label: "Shop all", href: "/shop" }}
          />
        </div>
        {/* Scroller is full-bleed on mobile so the next card peeks in from the edge. */}
        <div className="container-page max-md:pr-0">
          <ul className="scroller pb-2 max-md:pr-gutter">
            {mostWanted.map((product) => (
              <li key={product.slug}>
                <ProductCard
                  product={product}
                  sizes="(min-width: 64rem) 25vw, (min-width: 48rem) 33vw, 70vw"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page section" aria-label="Shop by category">
        <SectionHeading eyebrow="Explore" title="Shop by Category" />
        <ul className="grid grid-cols-2 gap-x-(--grid-gap-x) gap-y-8 lg:grid-cols-4">
          {categoryTiles.map((category) => (
            <li key={category.slug}>
              <Link href={`/${category.slug}`} className="group block">
                <div className="relative aspect-portrait overflow-hidden bg-surface">
                  <Image
                    src={category.image.src}
                    alt={category.image.alt}
                    fill
                    sizes="(min-width: 64rem) 25vw, 50vw"
                    className="object-cover transition-transform duration-1000 ease-luxe group-hover:scale-[1.03]"
                  />
                </div>
                <p className="caps mt-3 group-hover:underline group-hover:underline-offset-4">
                  {category.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Services />
    </main>
  );
}

function Hero() {
  const [primary, secondary] = hero.images;

  return (
    <section className="relative" aria-label="Featured campaign">
      <div className="grid md:grid-cols-2">
        <div className="relative h-[calc(100svh-var(--header-h)-2rem)] min-h-128 max-h-240">
          <Image
            src={primary.src}
            alt={primary.alt}
            fill
            preload
            sizes="(min-width: 48rem) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="relative hidden h-[calc(100svh-var(--header-h)-2rem)] min-h-128 max-h-240 md:block">
          <Image
            src={secondary.src}
            alt={secondary.alt}
            fill
            preload
            sizes="50vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-ink/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 pb-12 text-center text-canvas md:pb-16">
        <div className="container-page">
          <p className="caps">{hero.eyebrow}</p>
          <h1 className="mt-3 text-display">{hero.title}</h1>
          <p className="mx-auto mt-4 max-w-md text-body md:text-lead">{hero.body}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/women" className="btn btn-inverse w-full max-w-64 sm:w-auto">
              Shop women
            </Link>
            <Link href="/men" className="btn btn-inverse w-full max-w-64 sm:w-auto">
              Shop men
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Editorial() {
  return (
    <section className="grid-split items-center gap-y-0! bg-surface" aria-labelledby="editorial-title">
      <div className="relative aspect-portrait md:aspect-auto md:h-full md:min-h-160">
        <Image
          src={editorial.image.src}
          alt={editorial.image.alt}
          fill
          sizes="(min-width: 48rem) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="section px-gutter md:px-12 lg:px-20 xl:px-28">
        <p className="caps text-muted">{editorial.eyebrow}</p>
        <h2 id="editorial-title" className="mt-3 text-h1">
          {editorial.title}
        </h2>
        <p className="mt-6 max-w-md text-lead text-ink-soft">{editorial.body}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/collections/evening" className="btn btn-primary">
            Discover the edit
          </Link>
          <Link href="/journal/evening-edit" className="btn btn-secondary">
            Read the story
          </Link>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    title: "Complimentary delivery",
    body: "Free express shipping and returns on every order.",
  },
  {
    title: "Signature packaging",
    body: "Each piece arrives wrapped, ready to give.",
  },
  {
    title: "Book an appointment",
    body: "Private styling, in store or by video.",
  },
];

function Services() {
  return (
    <section className="border-t" aria-label="Client services">
      <ul className="container-page grid gap-8 py-12 text-center md:grid-cols-3 md:py-16">
        {services.map((service) => (
          <li key={service.title}>
            <h3 className="caps font-sans">{service.title}</h3>
            <p className="mt-2 text-body-sm text-muted">{service.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
