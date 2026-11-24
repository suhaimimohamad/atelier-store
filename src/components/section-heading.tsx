import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  link?: { label: string; href: string };
};

export function SectionHeading({ eyebrow, title, link }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
      <div>
        {eyebrow ? <p className="caps text-muted">{eyebrow}</p> : null}
        <h2 className="mt-2 text-h2">{title}</h2>
      </div>
      {link ? (
        <Link href={link.href} className="caps link inline-flex shrink-0 items-center gap-2">
          {link.label}
          <ArrowRightIcon className="hidden sm:block" />
        </Link>
      ) : null}
    </div>
  );
}
