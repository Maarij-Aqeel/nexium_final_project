"use client"

import SignupComp from "@/components/Signup";
import { TextFade } from "@/components/FadeUp";
import { signup } from "@/lib/auth";
import { ToastMessage } from "@/components/Message";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const handleUserSignup = async (data: any) => {
    try {
      const user = await signup(data);
      if (user && !user.email_confirmed_at) {
        ToastMessage({
          title: "Email Verification",
          message: "Check your email for verification",
        });
      } else {
        router.push("/");
      }
    } catch (err:any) {
      ToastMessage({
        title: "Error",
        message: err.message,
      });
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
