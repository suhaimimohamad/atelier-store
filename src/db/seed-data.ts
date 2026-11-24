/*
 * Sample catalog loaded by `npm run db:seed`. This was the hard-coded data
 * in src/lib/catalog.ts before the catalog moved to Postgres.
 */
import { unsplash, type Photo } from "../lib/catalog";

export type SeedCategory = {
  slug: string;
  name: string;
  image: Photo | null;
};

export type SeedProduct = {
  slug: string;
  categorySlug: string;
  name: string;
  priceCents: number;
  colour: string;
  description: string;
  details: string[];
  sizes: string[] | null;
  stockQuantity: number;
  isNew: boolean;
  isFeatured: boolean;
  images: Photo[];
};

const SHOE_SIZES = ["36", "37", "38", "39", "40", "41"];
const TAILORING_SIZES = ["46", "48", "50", "52", "54"];

/** Order matters: the homepage shows the first four category tiles. */
export const seedCategories: SeedCategory[] = [
  {
    slug: "women",
    name: "Women",
    image: unsplash(
      "JkpXj8FCRJ8",
      "photo-1760561132062-e6c2c353b799",
      "Woman in a green print dress carrying a tan tote",
    ),
  },
  {
    slug: "men",
    name: "Men",
    image: unsplash(
      "lDnaOcsXzx4",
      "photo-1619947663603-9eac34f2230f",
      "Man in a black turtleneck and jacket, black and white portrait",
    ),
  },
  {
    slug: "shoes",
    name: "Shoes",
    image: unsplash(
      "1NXsoyQaP5M",
      "photo-1634671494478-18ae96453241",
      "White sneakers hanging from a wooden stool against black",
    ),
  },
  {
    slug: "accessories",
    name: "Accessories",
    image: unsplash(
      "tBpGIeNoCnM",
      "photo-1627193875759-683b87090194",
      "Black acetate glasses resting on a white table",
    ),
  },
  { slug: "bags", name: "Bags", image: null },
];

export const seedProducts: SeedProduct[] = [
  {
    slug: "structured-top-handle-bag",
    categorySlug: "bags",
    name: "Structured top-handle bag",
    priceCents: 245000,
    colour: "Black",
    description:
      "A rigid top-handle bag cut from smooth calf leather, with a softly domed silhouette and a single interior compartment sized for the essentials.",
    details: [
      "Smooth calf leather",
      "Suede lining with one slip pocket",
      "Zip closure with palladium hardware",
      "Detachable shoulder strap",
      "W 32 × H 24 × D 13 cm",
      "Made in Italy",
    ],
    sizes: null,
    stockQuantity: 12,
    isNew: true,
    isFeatured: false,
    images: [
      unsplash(
        "uCH_6RofkH8",
        "photo-1546333456-3e8ed81f41e2",
        "Black leather top-handle bag resting on a chair",
      ),
    ],
  },
  {
    slug: "crystal-mesh-pump",
    categorySlug: "shoes",
    name: "Crystal mesh pump",
    priceCents: 98000,
    colour: "Silver",
    description:
      "A platform pump wrapped in fine crystal mesh that catches the light with every step. Built on a sculpted 120 mm heel with a hidden platform for comfort.",
    details: [
      "Crystal mesh upper",
      "Leather lining and sole",
      "120 mm heel, 20 mm platform",
      "Fits true to size",
      "Made in Italy",
    ],
    sizes: SHOE_SIZES,
    stockQuantity: 2,
    isNew: true,
    isFeatured: true,
    images: [
      unsplash(
        "Plg3KC7cV0o",
        "photo-1524553879936-2ff074ae5816",
        "Pair of silver crystal-mesh platform pumps",
      ),
    ],
  },
  {
    slug: "bottle-green-two-piece-suit",
    categorySlug: "men",
    name: "Two-piece suit in bottle green",
    priceCents: 320000,
    colour: "Bottle green",
    description:
      "A single-breasted suit in a dense wool twill, with a natural shoulder, notch lapels and flat-front trousers. Half-canvassed so it moulds to the wearer over time.",
    details: [
      "100% virgin wool twill",
      "Half-canvas construction",
      "Two-button jacket, notch lapels",
      "Flat-front trousers with side adjusters",
      "Regular fit",
      "Made in Italy",
    ],
    sizes: TAILORING_SIZES,
    stockQuantity: 12,
    isNew: false,
    isFeatured: true,
    images: [
      unsplash(
        "NxtxmmHc2OE",
        "photo-1593032465175-481ac7f401a0",
        "Man in a bottle green two-piece suit adjusting his cuff",
      ),
    ],
  },
  {
    slug: "mini-top-handle-bag",
    categorySlug: "bags",
    name: "Mini top-handle bag",
    priceCents: 189000,
    colour: "Black",
    description:
      "A compact top-handle bag in croc-embossed leather, with a fold-over flap and a long webbing strap for wearing crossbody. Small enough for evenings, structured enough to hold its shape.",
    details: [
      "Croc-embossed calf leather",
      "Magnetic flap closure",
      "Detachable webbing shoulder strap",
      "Leather lining with one slip pocket",
      "W 19 × H 13 × D 8 cm",
      "Made in Italy",
    ],
    sizes: null,
    stockQuantity: 12,
    isNew: true,
    isFeatured: true,
    images: [
      unsplash(
        "SPjurIsBnbY",
        "photo-1624968731957-536b843ab2f5",
        "Woman in a black knit dress carrying a small black top-handle bag",
      ),
    ],
  },
  {
    slug: "gold-cuff-bracelet",
    categorySlug: "accessories",
    name: "Gold cuff bracelet",
    priceCents: 72000,
    colour: "Gold",
    description:
      "An open cuff with a gently hammered finish, shaped to sit close to the wrist and stack easily with a watch.",
    details: [
      "Gold-plated sterling silver",
      "Hand-hammered finish",
      "Inner diameter 58 mm, adjustable",
      "Presented in a signature box",
    ],
    sizes: null,
    stockQuantity: 3,
    isNew: false,
    isFeatured: false,
    images: [
      unsplash(
        "esAis38NHT8",
        "photo-1586878340506-af074f2ee999",
        "Gold cuff bracelet on a cream cloth",
      ),
    ],
  },
  {
    slug: "pointed-pump-ivory",
    categorySlug: "shoes",
    name: "Pointed pump in ivory",
    priceCents: 86000,
    colour: "Ivory",
    description:
      "A clean, pointed-toe pump in supple nappa with a slender 100 mm heel. Finished with a cushioned insole for long days and longer evenings.",
    details: [
      "Nappa leather upper",
      "Leather lining and sole",
      "100 mm heel",
      "Cushioned insole",
      "Fits true to size",
      "Made in Italy",
    ],
    sizes: SHOE_SIZES,
    stockQuantity: 12,
    isNew: false,
    isFeatured: false,
    images: [
      unsplash(
        "Zx76sbAndc0",
        "photo-1535043934128-cf0b28d52f95",
        "Ivory pointed-toe pumps on a dark wooden floor",
      ),
    ],
  },
  {
    slug: "lilac-aviator-sunglasses",
    categorySlug: "accessories",
    name: "Lilac aviator sunglasses",
    priceCents: 42000,
    colour: "Lilac / rose gold",
    description:
      "A fine-wire aviator in rose-gold metal with softly tinted lilac lenses. Lightweight enough to wear all day, with adjustable nose pads for a close fit.",
    details: [
      "Rose-gold metal frame",
      "Lilac gradient lenses, 100% UV protection",
      "Adjustable nose pads",
      "Lens width 58 mm",
      "Supplied with a leather case",
    ],
    sizes: null,
    stockQuantity: 12,
    isNew: true,
    isFeatured: true,
    images: [
      unsplash(
        "vyioP91iSC8",
        "photo-1747731141445-7656d7467969",
        "Lilac-tinted aviator sunglasses on a pale grey surface",
      ),
    ],
  },
  {
    slug: "black-wool-suit",
    categorySlug: "men",
    name: "Black wool suit",
    priceCents: 290000,
    colour: "Black",
    description:
      "A relaxed single-breasted suit in black wool, with soft shoulders and a slightly longer jacket. Cut and finished by hand in our workroom, and as easy over a knit as it is with a shirt and tie.",
    details: [
      "Virgin wool",
      "Soft-shoulder, unstructured jacket",
      "Two-button front, notch lapels",
      "Straight-leg trousers",
      "Half-canvas construction",
      "Made in Italy",
    ],
    sizes: TAILORING_SIZES,
    stockQuantity: 12,
    isNew: false,
    isFeatured: false,
    images: [
      unsplash(
        "zL5_aKzZkQw",
        "photo-1638554244985-4d83598668b7",
        "Man in a black wool suit and cream knit leaning against a white brick wall",
      ),
      unsplash(
        "ksLWYYmK-0k",
        "photo-1584184924103-e310d9dc82fc",
        "Tailor cutting cloth by hand at a wooden workbench",
      ),
    ],
  },
  {
    slug: "steel-pocket-stopwatch",
    categorySlug: "accessories",
    name: "Steel pocket stopwatch",
    priceCents: 120000,
    colour: "Steel",
    description:
      "A restored mechanical stopwatch in a polished steel case, with a crisp enamel dial and a 60-minute counter. A collector's piece, wound by hand.",
    details: [
      "Polished steel case, 52 mm",
      "Hand-wound mechanical movement",
      "Enamel dial with 60-minute counter",
      "Restored and serviced in our workshop",
      "Presented in a signature box",
    ],
    sizes: null,
    stockQuantity: 0,
    isNew: false,
    isFeatured: true,
    images: [
      unsplash(
        "2Yj6MBvJ0sg",
        "photo-1628678172909-13a7209c7d62",
        "Steel pocket stopwatch with a white dial on a white surface",
      ),
    ],
  },
  {
    slug: "check-wool-waistcoat",
    categorySlug: "men",
    name: "Check wool waistcoat",
    priceCents: 115000,
    colour: "Mustard check",
    description:
      "A five-button waistcoat in a soft mustard check, with welt pockets and an adjustable back. Wear it with the matching suit or on its own over a crisp shirt.",
    details: [
      "Wool flannel check",
      "Five-button front",
      "Two welt pockets",
      "Adjustable back strap",
      "Made in Italy",
    ],
    sizes: TAILORING_SIZES,
    stockQuantity: 12,
    isNew: false,
    isFeatured: true,
    images: [
      unsplash(
        "yEwsZOXmgFE",
        "photo-1754577060025-9b0831bdc554",
        "Man in a mustard check three-piece suit, detail of waistcoat and rings",
      ),
    ],
  },
];
