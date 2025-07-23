"use client";

import Link from "next/link";
import Profile from "@/components/Profile";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathName = usePathname();
  const getclass = (path: string) => {
    return path === pathName
      ? "text-lg font-bold text-primary"
      : "text-lg hover:text-primary hover:scale-105 transition-all duration-300";
  };

  return (
    <nav className="flex gap-40 justify-between items-center px-4 py-4">
      {/* Links */}
      <div className="flex text-white gap-10">
        <Link href="/" className={getclass("/")}>
          Home
        </Link>
        <Link href="/about" className={getclass("/about")}>
          About
        </Link>
        <Link href="/dashboard" className={getclass("/dashboard")}>
          Dashboard
        </Link>
        <Link href="/interviews" className={getclass("/interviews")}>
          Interviews
        </Link>
      </div>

      {/* Profile Dropdown */}
      <div>
        <Profile />
      </div>
    </nav>
  );
}
