"use client";

import { useState } from "react";

// Presentational only: nothing is sent or stored until a newsletter backend exists.
export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="mt-6 text-body-sm" role="status">
        Thank you. You&apos;re on the list.
      </p>
    );
  }

  return (
    <form
      className="mt-6 flex flex-col gap-3 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        placeholder="Email address"
        className="h-12 min-w-0 flex-1 border border-line-strong bg-canvas px-4 text-body-sm placeholder:text-subtle"
      />
      <button type="submit" className="btn btn-primary">
        Subscribe
      </button>
    </form>
  );
}
