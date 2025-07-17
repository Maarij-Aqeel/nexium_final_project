"use client";

import { ToastMessage } from "@/components/Message";
import LoginComp from "@/components/Login";
import { TextFade } from "@/components/FadeUp";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

export default function LoginUser() {
  const router = useRouter();

  const handleLogin = async (data: any) => {
    try {
      const user = await login(data);

      if (user && user.email_confirmed_at) {
        //Redirect to home page
        router.push("/");
      }
    } catch (err: any) {
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
      <LoginComp onSubmit={handleLogin} />
    </TextFade>
  );
}
