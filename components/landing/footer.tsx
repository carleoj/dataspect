import Link from "next/link";
import { Brand } from "./brand";
import { LinkedInIcon, XIcon } from "./icons";

const COLUMNS = [
  {
    title: "Pages",
    links: [
      { label: "Product", href: "#product" },
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Documentation", href: "#" },
    ],
  },
  {
    title: "Socials",
    links: [
      { label: "X (Twitter)", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
  {
    title: "Register",
    links: [
      { label: "Get Started", href: "/signup" },
      { label: "Login", href: "/login" },
      { label: "Documentation", href: "#" },
    ],
  },
];

const SOCIAL = "text-neutral-500 transition hover:text-neutral-900";

export function LandingFooter() {
  return (
    <footer className="border-t border-neutral-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 py-16 lg:flex-row lg:justify-between lg:px-8 lg:py-24">
        <div>
          <Brand size="sm" />
          <div className="mt-6 flex items-center gap-4">
            <a href="#" aria-label="DataSpect on X" className={SOCIAL}>
              <XIcon />
            </a>
            <a href="#" aria-label="DataSpect on LinkedIn" className={SOCIAL}>
              <LinkedInIcon />
            </a>
          </div>
          <p className="mt-5 text-sm text-neutral-500">© 2026 DataSpect. All rights reserved.</p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-14 gap-y-10 sm:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="text-[15px] font-semibold text-neutral-800">{col.title}</h2>
              <ul className="mt-5 space-y-3.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[15px] text-neutral-600 transition hover:text-neutral-950">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}