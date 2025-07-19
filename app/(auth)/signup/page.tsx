"use client";

import SignupComp from "@/components/Signup";
import { TextFade } from "@/components/FadeUp";
import { signup } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Signup() {
  const router = useRouter();

  const handleUserSignup = async (data: any) => {
    try {
      const user = await signup(data);
      if (user && !user.email_confirmed_at) {
        toast.info("Account Activation link sent to Email!");
        router.push("/login");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <TextFade
      direction="up"
      className="flex items-center justify-center bg-hero-gradient min-h-screen px-4 py-24"
    >
      <SignupComp onSubmit={handleUserSignup} />
    </TextFade>
  );
}
