import SignupComp from "@/components/Signup";
import { TextFade } from "@/components/FadeUp";

export default function Signup() {
  return (
    <TextFade
      direction="up"
      className="flex items-center justify-center bg-hero-gradient min-h-screen px-4 py-24"
    >
      <SignupComp />
    </TextFade>
  );
}
