import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import Navigation from "./components/navigation";
import { Github, Linkedin } from "lucide-react";
import UserProviderWrapper from "@/components/providers/UserProviderWrapper";
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
      <body className={` ${monaSans.className}  antialiased`}>
        <UserProviderWrapper>
          <Navigation />

          <main className="flex-grow min-h-[80vh] ">{children}</main>

          <Toaster richColors position="top-center" />
          {/* Footer */}
          <footer className="bg-white/[0.03] border-t border-white/[0.06] py-6 backdrop-blur-xl px-6 sm:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Divider */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm ml-5 text-gray-500/90">
                  © {new Date().getFullYear()} Intervue AI. All rights reserved.
                </p>

                <div className="flex items-center gap-4">
                  <a href="https://github.com/Maarij-Aqeel" className="group">
                    <Github className="w-5 h-5 text-gray-400/90 group-hover:text-white transition-all duration-200" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/maarijaqeel/"
                    className="group"
                  >
                    <Linkedin className="w-5 h-5 text-gray-400/90 group-hover:text-white transition-all duration-200" />
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </UserProviderWrapper>
      </body>
    </html>
  );
}
