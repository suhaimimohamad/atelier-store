import Image from "next/image";
import Link from "next/link";

import { formatPrice, type Product } from "@/lib/catalog";

const GRID_SIZES = "(min-width: 64rem) 25vw, (min-width: 48rem) 33vw, 50vw";

export function ProductCard({ product, sizes = GRID_SIZES }: { product: Product; sizes?: string }) {
  const [image] = product.images;
  const soldOut = product.stock.status === "sold_out";
  const badge = soldOut ? "Sold out" : product.isNew ? "New" : null;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="media-product">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className="transition-transform duration-700 ease-luxe group-hover:scale-[1.03]"
        />
        {badge ? (
          <span className="caps absolute top-3 left-3 bg-canvas px-2 py-1 text-micro">{badge}</span>
        ) : null}
      </div>
      <div className="mt-3 flex flex-col gap-1 md:mt-4">
        <p className="text-caption text-muted">{product.category}</p>
        <h3 className="font-sans text-body-sm group-hover:underline group-hover:underline-offset-4">
          {product.name}
        </h3>
        <p className="text-body-sm">{formatPrice(product.priceCents)}</p>
      </div>
    </Link>
  );
}
