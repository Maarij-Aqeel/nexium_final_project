import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import Navigation from "./components/navigation";
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
        <header className=" sticky top-0 left-0 z-50 w-full bg-background px-6 py-4">
          <div className="flex mt-2 items-center justify-between">
            <h1 className="text-2xl text-left">AI Interviewer</h1>
            <Navigation />
          </div>
        </header>

        <main className="flex-grow min-h-[80vh] ">{children}</main>
        {/* Footer */}
        <footer className="bg-gradient-to-r from-primary/80 to-secondary text-center text-gray-800 py-6 shadow-inner">
          <div className="text-sm">
            © {new Date().getFullYear()} BlogDigester. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
