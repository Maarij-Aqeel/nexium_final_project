"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/app/context/user-context";
import { signout } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { user, profile } = useUser();

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  const handleLogout = async () => {
    try {
      await signout();
      toast.success("Logged out successfully");
      router.push("/");
      setIsLoggedIn(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleProfileClick = async () => {
    if (!user) {
      router.push("/signup");
    }
  };

  if (!isLoggedIn) {
    return (
      <div
        onClick={handleProfileClick}
        className="flex items-center gap-2 cursor-pointer"
      >
        {/* Guest user icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white  hover:text-primary transition"
          fill="none"
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
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 flex items-center gap-2 cursor-pointer">
        {/* Logged-in user icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8- h-8 text-white hover:text-primary transition"
          fill="none"
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
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-background/70 backdrop-blur-md text-lg text-white p-4">
        <DropdownMenuLabel className="text-white font-bold text-lg">
          {profile?.name || ""}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="text-gray-300">
          {profile?.email || ""}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-gray-300 cursor-pointer hover:bg-gray-900/70">
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem className="text-gray-300 cursor-pointer hover:bg-gray-900/70">
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-500 font-semibold cursor-pointer hover:bg-gray-900/70"
          onClick={handleLogout}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
