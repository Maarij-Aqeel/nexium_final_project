"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ToastMessage } from "./Message";
import { passSchema } from "@/lib/passSchema";

export default function LoginComp({onSubmit}:{onSubmit:any}) {
  const [userdata, setUserdata] = useState({
    email: "",
    password: "",
  });
  const [allFilled, setAllFilled] = useState(false);

  // Update allFilled state when userdata changes
  useEffect(() => {
    const { email, password } = userdata;
    setAllFilled(email.trim() !== "" && password.trim() !== "");
  }, [userdata]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const result = passSchema.safeParse({ password: userdata.password });

    if (!result.success) {

      ToastMessage({
        title: "Error",
        message: "Password is not correct",
      });
    } else {
      // Handle form submission here
      onSubmit(userdata)
      console.log("Form submitted:", userdata);
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login here
    console.log("Google login clicked");
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

        {/* Password  */}
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

        {/* Submit Button */}
        <div className="flex flex-col items-center gap-6 justify-center pt-4">
          <Button
            type="button"
            onClick={handleGoogleLogin}
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
            Login with Google
          </Button>
          <h1 className="text-center font-bold">or</h1>
          <Button
            type="submit"
            className="w-80 h-14 px-8 rounded-full text-black font-semibold text-2xl bg-gradient-to-r from-primary to-secondary hover:bg-transparent hover:scale-105 transition-all duration-200 flex items-center justify-center hover:shadow-[0_0_20px_5px_rgba(0,255,255,0.5)]"
            disabled={!allFilled}
          >
            Login
          </Button>
        </div>
      </div>
    </form>
  );
}
