"use client";

import Link from "next/link";
import { useState } from "react";

import type { Product } from "@/lib/catalog";

type PurchasePanelProps = {
  sizes: Product["sizes"];
  stock: Product["stock"];
};

// Size selection and add-to-bag UI. Not wired to a cart yet: "adding" only shows a confirmation.
// Stock is tracked per product, so every listed size is selectable while the product is in stock.
export function PurchasePanel({ sizes, stock }: PurchasePanelProps) {
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);

  if (stock.status === "sold_out") {
    return (
      <div className="flex flex-col gap-3">
        <button type="button" className="btn btn-primary btn-block" disabled>
          Sold out
        </button>
        <Link href="/contact" className="btn btn-secondary btn-block">
          Ask client services
        </Link>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault();
        if (sizes && !size) {
          setError(true);
          return;
        }
        setAdded(true);
      }}
    >
      {sizes ? (
        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <p id="size-label" className="caps">
              Size{size ? <span className="ml-2 text-muted normal-case tracking-normal">{size}</span> : null}
            </p>
            <Link href="/size-guide" className="link text-caption">
              Size guide
            </Link>
          </div>
          <div role="radiogroup" aria-labelledby="size-label" className="grid grid-cols-5 gap-2 sm:grid-cols-6">
            {sizes.map((option) => (
              <label key={option} className="relative">
                <input
                  type="radio"
                  name="size"
                  value={option}
                  checked={size === option}
                  onChange={() => {
                    setSize(option);
                    setError(false);
                    setAdded(false);
                  }}
                  className="peer sr-only"
                />
                <span className="flex h-11 cursor-pointer items-center justify-center border text-body-sm transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-canvas peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink hover:border-ink">
                  {option}
                </span>
              </label>
            ))}
          </div>
          {error ? (
            <p className="mt-3 text-body-sm text-sale" role="alert">
              Please select a size.
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-col gap-3">
        <button type="submit" className="btn btn-primary btn-block">
          {added ? "Added to bag" : "Add to bag"}
        </button>
        <p className="text-body-sm text-muted" role="status">
          {added ? `Added${size ? `, size ${size}` : ""}. Checkout is coming soon.` : null}
        </p>
      </div>
    </form>
  );
}
