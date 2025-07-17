"use client";

import { signout } from "@/lib/auth";
import { ToastMessage } from "@/components/Message";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function SignoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signout();
      router.push("/"); // redirect after signout (optional)
    } catch (err: any) {
      ToastMessage({
        title: "Signout Error",
        message: err.message,
      });
    }
  };

  return (
    <Button onClick={handleLogout} variant="destructive">
      Sign Out
    </Button>
  );
}
