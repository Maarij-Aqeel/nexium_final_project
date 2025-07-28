"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { passSchema } from "@/lib/passSchema";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, User, Building2, Users } from "lucide-react";
import { SignInwithGoogle } from "@/lib/auth";

export default function SignupComp({ onSubmit }: { onSubmit: any }) {
  const [userdata, setUserdata] = useState({
    name: "",
    email: "",
    password: "",
    is_company: false,
  });
  const [allFilled, setAllFilled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Update allFilled state when userdata changes
  useEffect(() => {
    const { name, email, password } = userdata;
    setAllFilled(
      name.trim() !== "" && email.trim() !== "" && password.trim() !== ""
    );
  }, [userdata]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const result = passSchema.safeParse({ password: userdata.password });

    setTimeout(() => {
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;

        const errorMsg = errors.password?.[0] || "Invalid input";

        toast.error(errorMsg);
      } else {
        const { name, is_company } = userdata;
        localStorage.setItem(
          "pendingProfile",
          JSON.stringify({ name, is_company })
        );
        onSubmit(userdata);
      }

      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-lg shadow-2xl border border-white/20 bg-background/70 backdrop-blur-md rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-row items-center gap-2 pb-8 px-8 pt-8">
        <div className="relative">
          <div className="absolute inset-0 rounded-full  blur-sm" />
           <img
            src="/images/logo.png"
            alt="Logo"
            className="relative h-28 w-28  flex-shrink-0 mb-2 "
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Intervue AI
          </h1>
          <p className="text-xl font-semibold text-muted-foreground mt-2">
            Practice job interviews with AI
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="space-y-6 px-10 pb-8">
        <div className="grid grid-cols-1 gap-6">
          {/* Full Name */}
          <div className="space-y-3">
            <Label
              htmlFor="name"
              className="text-base font-medium flex items-center gap-2"
            >
              <User className="w-4 h-4 text-primary" />
              Full Name
            </Label>
            <div className="relative group">
              <Input
                id="name"
                className="rounded-3xl h-14 px-4 pl-12 text-base border-white/20 bg-background/50 backdrop-blur-sm focus:bg-background/70 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 group-hover:bg-background/60"
                type="text"
                placeholder="Enter your full name"
                required
                value={userdata.name}
                onChange={(e) =>
                  setUserdata({ ...userdata, name: e.target.value })
                }
              />
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-3">
            <Label
              htmlFor="email"
              className="text-base font-medium flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-primary" />
              Email
            </Label>
            <div className="relative group">
              <Input
                id="email"
                className="rounded-3xl h-14 px-4 pl-12 text-base border-white/20 bg-background/50 backdrop-blur-sm focus:bg-background/70 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 group-hover:bg-background/60"
                type="email"
                placeholder="username@example.com"
                required
                value={userdata.email}
                onChange={(e) =>
                  setUserdata({ ...userdata, email: e.target.value })
                }
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
            </div>
          </div>
        </div>

        {/* Password - Full width */}
        <div className="space-y-3">
          <Label
            htmlFor="password"
            className="text-base font-medium flex items-center gap-2"
          >
            <Lock className="w-4 h-4 text-primary" />
            Password
          </Label>
          <div className="relative group">
            <Input
              id="password"
              className="rounded-3xl h-14 px-4 pl-12 pr-12 text-base border-white/20 bg-background/50 backdrop-blur-sm focus:bg-background/70 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 group-hover:bg-background/60"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              required
              value={userdata.password}
              onChange={(e) =>
                setUserdata({ ...userdata, password: e.target.value })
              }
            />
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors p-1"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Account Type */}
        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Account Type
          </Label>
          <RadioGroup
            className="flex gap-8 justify-center"
            value={userdata.is_company ? "Company" : "Individual"}
            onValueChange={(value) =>
              setUserdata({ ...userdata, is_company: value === "Company" })
            }
          >
            <div className="flex items-center space-x-3 p-4 rounded-2xl border border-white/10 bg-background/30 backdrop-blur-sm hover:bg-background/40 transition-all duration-200 group">
              <RadioGroupItem
                id="individual"
                value="Individual"
                className="w-5 h-5 border-primary/50 text-primary"
              />
              <Label
                htmlFor="individual"
                className="text-base cursor-pointer flex items-center gap-2 group-hover:text-primary transition-colors"
              >
                <User className="w-4 h-4" />
                Individual
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-2xl border border-white/10 bg-background/30 backdrop-blur-sm hover:bg-background/40 transition-all duration-200 group">
              <RadioGroupItem
                id="company"
                value="Company"
                className="w-5 h-5 border-primary/50 text-primary"
              />
              <Label
                htmlFor="company"
                className="text-base cursor-pointer flex items-center gap-2 group-hover:text-primary transition-colors"
              >
                <Building2 className="w-4 h-4" />
                Company
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col items-center gap-6 justify-center pt-6">
          <Button
            type="button"
            onClick={SignInwithGoogle}
            disabled={isLoading}
            className="w-80 h-14 px-8 rounded-full text-white border border-secondary font-semibold text-lg bg-transparent hover:bg-secondary/5 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 128 128"
                  className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
                >
                  <path
                    fill="#fff"
                    d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.3 74.3 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.2 36.2 0 0 1-13.93 5.5a41.3 41.3 0 0 1-15.1 0A37.2 37.2 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.3 38.3 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.3 34.3 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.2 61.2 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38"
                  />
                  <path
                    fill="#e33629"
                    d="M44.59 4.21a64 64 0 0 1 42.61.37a61.2 61.2 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.3 34.3 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21"
                  />
                  <path
                    fill="#f8bd00"
                    d="M3.26 51.5a63 63 0 0 1 5.5-15.9l20.73 16.09a38.3 38.3 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9"
                  />
                  <path
                    fill="#587dbd"
                    d="M65.27 52.15h59.52a74.3 74.3 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68"
                  />
                  <path
                    fill="#319f43"
                    d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.2 37.2 0 0 0 14.08 6.08a41.3 41.3 0 0 0 15.1 0a36.2 36.2 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.7 63.7 0 0 1 8.75 92.4"
                  />
                </svg>
                Sign up with Google
              </>
            )}
          </Button>

          {/* Divider */}
          <div className="relative w-80">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background/70 px-4 text-muted-foreground text-xl font-semibold">
                or
              </span>
            </div>
          </div>

          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!allFilled || isLoading}
            className="w-80 h-14 px-8 rounded-full text-black font-semibold text-xl bg-gradient-to-r from-primary to-secondary hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create an Account"
            )}
          </Button>

          {/* Footer */}
          <div className="flex flex-row gap-3 text-center items-center pt-4 border-t border-white/10">
            <p className="text-muted-foreground">Already have an Account?</p>
            <button
              className="text-xl bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text font-semibold hover:opacity-60 transition-opacity hover:underline"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
