import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import Navigation from "./components/navigation";
import { Toaster } from "sonner";
import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI_interviewwer",
  description: "AI powered platforms for practicing Interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${monaSans.className}  antialiased`}>
        <header className=" sticky top-0 left-0 z-50 w-full bg-background px-8 ">
          <div className="flex mt-2 items-center justify-between ">
            <h1 className="text-2xl text-left">AI Interviewer</h1>
            <Navigation />
          </div>
        </header>

        <main className="flex-grow min-h-[80vh] ">{children}</main>
        <Toaster richColors position="top-center" />
        {/* Footer */}
        <footer className="bg-gray-900 text-center text-muted py-6 shadow-inner">
          <div className="text-sm">
            © {new Date().getFullYear()} Ai Interviewer. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
