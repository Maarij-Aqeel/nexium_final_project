import LoginComp from "@/components/Login";
import { TextFade } from "@/components/FadeUp";

export default function Login() {
  return (
    <TextFade
      direction="up"
      className="flex items-center justify-center bg-hero-gradient min-h-screen px-4 py-24"
    >
      <LoginComp />
    </TextFade>
  );
}
