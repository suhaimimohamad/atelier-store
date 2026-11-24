import Link from "next/link";

import { BagIcon, CloseIcon, MenuIcon, SearchIcon, UserIcon } from "@/components/icons";
import { navigation } from "@/lib/catalog";

export function SiteHeader() {
  return (
    <>
      <div className="bg-ink py-2 text-center text-canvas">
        <p className="caps text-micro">Complimentary shipping and returns</p>
      </div>

      <header className="sticky top-0 z-40 border-b bg-canvas/95 backdrop-blur-sm">
        <div className="container-page grid h-header grid-cols-[1fr_auto_1fr] items-center">
          {/* Left: menu (mobile) / primary nav (desktop) */}
          <div className="flex items-center">
            <button
              type="button"
              popoverTarget="site-menu"
              className="btn-icon -ml-3 lg:hidden"
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
            <Link href="/search" className="btn-icon lg:hidden" aria-label="Search">
              <SearchIcon />
            </Link>
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex gap-6 xl:gap-8">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="caps link-quiet">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Center: wordmark */}
          <Link
            href="/"
            className="px-4 font-display text-2xl tracking-[0.3em] uppercase md:text-[1.75rem]"
          >
            Atelier
          </Link>

          {/* Right: utilities */}
          <div className="-mr-3 flex items-center justify-end">
            <Link href="/search" className="btn-icon hidden lg:inline-flex" aria-label="Search">
              <SearchIcon />
            </Link>
            <Link href="/account" className="btn-icon" aria-label="Account">
              <UserIcon />
            </Link>
            <Link href="/bag" className="btn-icon" aria-label="Shopping bag, 0 items">
              <BagIcon />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile menu: native popover, no client JS. Esc and outside clicks close it. */}
      <div
        id="site-menu"
        popover="auto"
        className="inset-y-0 left-0 m-0 h-dvh max-h-none w-full max-w-none border-0 sm:max-w-sm bg-canvas p-0 text-ink backdrop:bg-ink/40"
      >
        <div className="flex h-header items-center justify-between border-b px-gutter">
          <span className="caps">Menu</span>
          <button
            type="button"
            popoverTarget="site-menu"
            popoverTargetAction="hide"
            className="btn-icon -mr-3"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Mobile" className="px-gutter py-6">
          <ul className="flex flex-col">
            {navigation.map((item) => (
              <li key={item.href} className="border-b">
                <Link href={item.href} className="block py-4 font-display text-h3">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-4">
            <Link href="/account" className="caps link-quiet">
              Account
            </Link>
            <Link href="/contact" className="caps link-quiet">
              Client services
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
