import Link from "next/link";
import { Brand } from "./brand";
import { ButtonLink } from "./button-link";
import { ChevronDown, MenuIcon } from "./icons";

const LINK = "text-[15px] text-neutral-700 transition hover:text-neutral-950";

const MAIN = [
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
];
const RESOURCES = [
  { label: "Documentation", href: "#" },
  { label: "Guides", href: "#" },
  { label: "Changelog", href: "#" },
];
const CONTACT = { label: "Contact", href: "#contact" };

export function LandingHeader() {
  return (
    <header className="group/header relative">
      <input type="checkbox" id="landing-nav-toggle" className="peer sr-only" />

      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto] items-center gap-6 px-6 md:grid-cols-[1fr_auto_1fr] lg:px-8">
        <div>
          <Brand />
        </div>

        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {MAIN.map((l) => (
            <Link key={l.label} href={l.href} className={LINK}>
              {l.label}
            </Link>
          ))}

          <div className="group relative">
            <button type="button" className={`${LINK} flex cursor-pointer items-center gap-1`}>
              Resources
              <ChevronDown className="size-4 text-neutral-500 transition group-hover:rotate-180 group-focus-within:rotate-180" />
            </button>
            <div className="invisible absolute left-1/2 top-full z-20 w-48 -translate-x-1/2 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <ul className="rounded-lg border border-neutral-200 bg-white p-1 shadow-lg">
                {RESOURCES.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="block rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link href={CONTACT.href} className={LINK}>
            {CONTACT.label}
          </Link>
        </nav>

        <div className="flex items-center justify-end gap-3 sm:gap-6">
          <Link href="/login" className={`${LINK} hidden sm:block`}>
            Login
          </Link>
          <ButtonLink href="/signup">Try for free</ButtonLink>
          <label
            htmlFor="landing-nav-toggle"
            className="grid size-10 cursor-pointer place-items-center rounded-lg text-neutral-700 hover:bg-neutral-100 group-has-[input:focus-visible]/header:ring-2 group-has-[input:focus-visible]/header:ring-blue-600 md:hidden"
          >
            <span className="sr-only">Toggle menu</span>
            <MenuIcon />
          </label>
        </div>
      </div>

      <nav
        aria-label="Mobile"
        className="hidden border-t border-neutral-100 bg-white peer-checked:block md:hidden"
      >
        <ul className="mx-auto max-w-7xl space-y-1 px-6 py-4">
          {[...MAIN, ...RESOURCES, CONTACT].map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="block rounded-lg px-3 py-2 text-neutral-700 hover:bg-neutral-50">
                {l.label}
              </Link>
            </li>
          ))}
          <li className="sm:hidden">
            <Link href="/login" className="block rounded-lg px-3 py-2 text-neutral-700 hover:bg-neutral-50">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}