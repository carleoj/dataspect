import Image from "next/image";
import Link from "next/link";

export function Brand({ size = "md" }: { size?: "md" | "sm" }) {
  const px = size === "md" ? 30 : 24;

  return (
    <Link href="/" className="inline-flex items-center gap-2.5 text-neutral-900">
      <Image src="/logo-navy-dark.svg" alt="" width={px} height={px} priority={size === "md"} />
      <span className={`font-semibold tracking-tight ${size === "md" ? "text-xl" : "text-base"}`}>
        DataSpect
      </span>
    </Link>
  );
}