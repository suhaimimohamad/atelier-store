import Image from "next/image";

import type { Photo } from "@/lib/catalog";

/*
 * Mobile: full-bleed horizontal swipe; with several images the next one peeks in.
 * Desktop: images stacked in a column beside the sticky product info.
 */
export function ProductGallery({ images, name }: { images: Photo[]; name: string }) {
  const multiple = images.length > 1;

  return (
    <div
      aria-label={`${name} images`}
      role="region"
      className="-mx-gutter flex snap-x snap-mandatory gap-(--grid-gap-x) overflow-x-auto [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible"
    >
      {images.map((image, index) => (
        <div
          key={image.src}
          className={`media-product shrink-0 snap-start ${multiple ? "w-[88%]" : "w-full"} lg:w-full`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload={index === 0}
            sizes="(min-width: 64rem) 58vw, 100vw"
          />
        </div>
      ))}
    </div>
  );
}
