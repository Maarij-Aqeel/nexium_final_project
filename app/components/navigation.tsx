"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathName = usePathname();
  const getclass = (path: string) => {
    return path === pathName
      ? "text-lg font-bold text-primary"
      : "text-lg hover:text-primary hover:scale-105 transition-all duration-300";
  };

  return (
    <nav className="flex gap-10 justify-between items-center px-10 py-4 ">
      {/* Links */}
      <div className="flex text-white gap-10 ">
        <Link href="/" className={getclass("/")}>
          Home
        </Link>
        <Link href="/about" className={getclass("/about")}>
          About
        </Link>
        <Link href="/interviews" className={getclass("/interviews")}>
          Interviews
        </Link>
        <Link href="/dashboard" className={getclass("/dashboard")}>
          Dashboard
        </Link>
      </div>

      {/* Profile Section */}
      <div>
        <Link href="/profile" className={getclass("/profile") + " group"}>
          <span className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6  group-hover:text-primary group-hover:scale-105 transition-all duration-300"
              fill="none"
              data-name="Profile Male"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A13.966 13.966 0 0112 15c2.485 0 4.797.738 6.879 2.004M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className=" group-hover:text-primary group-hover:scale-105 transition-all duration-300">
              Profile
            </span>
          </span>
        </Link>
      </div>
    </nav>
  );
}
