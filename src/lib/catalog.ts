/*
 * Catalog types, shared helpers and static editorial content.
 *
 * Products, categories and stock live in Postgres (src/db/schema/catalog.ts)
 * and are read through src/db/queries/catalog.ts. Seed data is in
 * src/db/seed-data.ts.
 *
 * Photos are hotlinked from Unsplash (Unsplash License). `credit` is each
 * photo's page on unsplash.com.
 */

export type Photo = {
  src: string;
  alt: string;
  credit?: string;
};

export type StockStatus = "in_stock" | "low_stock" | "sold_out";

export type Stock = { status: StockStatus; quantity: number };

export type Product = {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  priceCents: number;
  isNew: boolean;
  colour: string;
  description: string;
  details: string[];
  /** Null for one-size items such as bags and jewellery. */
  sizes: string[] | null;
  stock: Stock;
  /** First image is the primary shot used on cards. */
  images: Photo[];
};

export type Category = {
  slug: string;
  name: string;
  image: Photo | null;
};

export type Collection = {
  slug: string;
  name: string;
  blurb: string;
  image: Photo;
};

/** At or below this quantity the storefront shows "Only N left". */
export const LOW_STOCK_THRESHOLD = 3;

export function toStock(quantity: number): Stock {
  if (quantity <= 0) return { status: "sold_out", quantity: 0 };
  if (quantity <= LOW_STOCK_THRESHOLD) return { status: "low_stock", quantity };
  return { status: "in_stock", quantity };
}

export function stockLabel(stock: Stock) {
  switch (stock.status) {
    case "in_stock":
      return "In stock";
    case "low_stock":
      return `Only ${stock.quantity} left`;
    case "sold_out":
      return "Sold out";
  }
}

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

export function unsplash(id: string, path: string, alt: string): Photo {
  return {
    src: `https://images.unsplash.com/${path}?auto=format&fit=crop&w=2000&q=80`,
    alt,
    credit: `https://unsplash.com/photos/${id}`,
  };
}

/* ---------- Static editorial content ---------- */

export const hero = {
  eyebrow: "Autumn–Winter 2026",
  title: "The Quiet Hour",
  body: "Sculpted wool, deep colour and the ease of a long evening.",
  images: [
    unsplash(
      "uJMLbCTXUyo",
      "photo-1676576844085-ce6d79e4f277",
      "Woman in a vivid red wool coat standing in a station hall",
    ),
    unsplash(
      "YSFlaL_zyLc",
      "photo-1563469004801-2eded8dcfb95",
      "Man in a dark green velvet jacket against a black backdrop",
    ),
  ],
};

export const editorial = {
  eyebrow: "The Evening Edit",
  title: "Pearls, gloves and a long shadow",
  body: "Opera gloves return alongside sculpted necklines and pared-back jewellery, made for rooms lit low.",
  image: unsplash(
    "yCDTlmEBFg8",
    "photo-1760969485983-c7b370a1532f",
    "Woman in long black evening gloves and a pearl necklace",
  ),
};

export const collections: Collection[] = [
  {
    slug: "evening",
    name: "Evening",
    blurb: "Black, bare and luminous.",
    image: unsplash(
      "eWwYAgaF24I",
      "photo-1768818565983-29d3f4d76869",
      "Woman in a black dress lying on a pale floor, photographed from above",
    ),
  },
  {
    slug: "tailoring",
    name: "Tailoring",
    blurb: "Sharp shoulders, soft wool.",
    image: unsplash(
      "RuBXafq461A",
      "photo-1622497170185-5d668f816a56",
      "Man in a grey suit and sunglasses on stone steps",
    ),
  },
  {
    slug: "off-duty",
    name: "Off Duty",
    blurb: "Colour, texture and weekends away.",
    image: unsplash(
      "MgAOFMRedCI",
      "photo-1768001151324-42ae92c70b69",
      "Model in a colour-blocked jacket and feathered skirt lying in sand",
    ),
  },
];

export const navigation = [
  { label: "New In", href: "/new" },
  { label: "Women", href: "/women" },
  { label: "Men", href: "/men" },
  { label: "Bags", href: "/bags" },
  { label: "Shoes", href: "/shoes" },
  { label: "Accessories", href: "/accessories" },
];
