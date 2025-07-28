"use client";
import Link from "next/link";
import Image from "next/image";
import Profile from "@/components/Profile";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const linkClass = (path: string) =>
    pathname === path
      ? "text-primary font-semibold"
      : "text-white/70 hover:text-primary/90 transition-all duration-300 transition";

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full">
      <nav className="mx-auto flex items-center justify-between max-w-6xl rounded-b-2xl border-t-0 border-x border-b border-white/10 bg-white/5 backdrop-blur-xl px-6 py-3 shadow-[0_8px_32px_rgba(0,217,255,0.08)]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Intervue AI"
            width={40}
            height={40}
            priority
            className="h-10 w-auto object-contain mb-1 p-0"
          />

          <span className="hidden sm:inline text-lg font-black tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Intervue AI
          </span>
        </Link>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-6 text-sm">
          {["/", "/About", "/Dashboard", "/Interviews"].map((p) => (
            <li key={p}>
              <Link
                href={p.toLowerCase()}
                className={linkClass(p.toLowerCase())}
              >
                {p === "/" ? "Home" : p.slice(1).replace("/", "")}
              </Link>
            </li>
          ))}
        </ul>

        <Profile />
      </nav>
    </header>
  );
}
