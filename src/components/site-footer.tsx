import Link from "next/link";

import { NewsletterForm } from "@/components/newsletter-form";

const columns = [
  {
    title: "Client services",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "The house",
    links: [
      { label: "About Atelier", href: "/about" },
      { label: "Craftsmanship", href: "/craftsmanship" },
      { label: "Journal", href: "/journal" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-surface">
      <div className="container-page section grid gap-12 lg:grid-cols-[2fr_3fr]">
        <div className="max-w-md">
          <h2 className="text-h3">Letters from the atelier</h2>
          <p className="mt-3 text-body-sm text-muted">
            New collections, private appointments and the occasional story. Sent
            no more than twice a month.
          </p>
          <NewsletterForm />
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="caps font-sans">{column.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="link-quiet text-body-sm text-muted hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container-page">
        <div className="flex flex-col gap-2 border-t py-6 text-caption text-muted sm:flex-row sm:justify-between">
          <p>© 2026 Atelier. Sample storefront.</p>
          <p>
            Photography via{" "}
            <a href="https://unsplash.com" className="link" target="_blank" rel="noreferrer">
              Unsplash
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
