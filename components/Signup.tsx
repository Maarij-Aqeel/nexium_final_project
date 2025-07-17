"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { passSchema } from "@/lib/passSchema";
import { Input } from "@/components/ui/input";
import { ToastMessage } from "./Message";
import { useRouter } from "next/navigation";
import { SignInwithGoogle } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function SignupComp({ onSubmit }: { onSubmit: any }) {
  const router=useRouter()

  const [userdata, setUserdata] = useState({
    name: "",
    email: "",
    password: "",
    is_company: false,
  });
  const [allFilled, setAllFilled] = useState(false);

  // Update allFilled state when userdata changes
  useEffect(() => {
    const { name, email, password } = userdata;
    setAllFilled(
      name.trim() !== "" && email.trim() !== "" && password.trim() !== ""
    );
  }, [userdata]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const result = passSchema.safeParse({ password: userdata.password });

    if (!result.success) {
      // Handle validation errors
      const errors = result.error.flatten().fieldErrors;

      const errorMsg = errors.password?.[0] || "Invalid input";
      console.log(errorMsg);

      ToastMessage({
        title: "Error",
        message: errorMsg,
      });
    } else {
      // Handle form submission here
      onSubmit(userdata);
    }
  };



  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg shadow-xl border border-primary/10 bg-background/70 backdrop-blur-md rounded-lg"
    >
      {/* Header */}
      <div className="flex flex-row items-center gap-6 pb-8 px-8 pt-8">
        <img
          src="https://img.icons8.com/?size=100&id=HRqoDlVZAD8t&format=png&color=000000"
          alt="Logo"
          className="h-12 w-12 rounded-full flex-shrink-0 mb-4"
        />
        <div className="flex flex-col">
          <h1 className="text-4xl text-center font-bold text-primary">
            AI Interviewer
          </h1>
          <p className="text-xl font-semibold muted-foreground mt-4">
            Practice job interviews with AI
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="space-y-8 px-10 pb-8">
        <div className="grid grid-cols-1 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-medium">
              Full Name
            </Label>
            <Input
              id="name"
              className="rounded-3xl h-12 px-4 text-base"
              type="text"
              placeholder="Enter your name"
              required
              value={userdata.name}
              onChange={(e) =>
                setUserdata({ ...userdata, name: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-medium">
              Email
            </Label>
            <Input
              id="email"
              className="rounded-3xl h-12 px-4 text-base"
              type="email"
              placeholder="username@example.com"
              required
              value={userdata.email}
              onChange={(e) =>
                setUserdata({ ...userdata, email: e.target.value })
              }
            />
          </div>
        </div>

        {/* Password - Full width */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-base font-medium">
            Password
          </Label>
          <Input
            id="password"
            className="rounded-3xl h-12 px-4 text-base"
            type="password"
            placeholder="********"
            required
            value={userdata.password}
            onChange={(e) =>
              setUserdata({ ...userdata, password: e.target.value })
            }
          />
        </div>

        {/* Account Type */}
        <div className="space-y-3">
          <Label className="text-base font-medium block">Account Type</Label>
          <RadioGroup
            className="flex gap-8 justify-center"
            value={userdata.is_company ? "Company" : "Individual"}
            onValueChange={(value) =>
              setUserdata({ ...userdata, is_company: value === "Company" })
            }
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                id="individual"
                value="Individual"
                className="w-5 h-5"
              />
              <Label htmlFor="individual" className="text-base cursor-pointer">
                Individual
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                id="company"
                value="Company"
                className="w-5 h-5"
              />
              <Label htmlFor="company" className="text-base cursor-pointer">
                Company
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col items-center gap-6 justify-center pt-4">
          <Button
            type="button"
            onClick={SignInwithGoogle}
            className="w-80 h-14 px-8 rounded-full text-white border border-secondary font-semibold text-xl bg-transparent hover:bg-secondary/5 hover:scale-105 transition-all duration-200 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 128 128"
              className="w-20 h-20"
              width="100%"
              height="100%"
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
            Signup with Google
          </Button>
          <h1 className="text-center text-xl font-semibold">or</h1>
          <Button
            type="submit"
            className="w-80 h-14 px-8 rounded-full text-black font-semibold text-xl bg-gradient-to-r from-primary to-secondary hover:bg-transparent hover:scale-105 transition-all duration-200 flex items-center justify-center hover:shadow-[0_0_20px_5px_rgba(0,255,255,0.5)]"
            disabled={!allFilled}
          >
            Create an Account
          </Button>

          <div className="flex flex-row gap-3 text-center items-center">
            <p>Already have an Account?</p>
            <button className="text-xl bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text font-semibold hover:opacity-60" onClick={()=>router.push("/login")}>
              Login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
