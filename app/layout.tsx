import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FloatingDock } from "@/components/FloatingDock";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "rithvik", template: "%s | rithvik" },
  description: "web & product engineer — fullstack, web3, and ai-powered products.",
  icons: { icon: "/avatar.jpeg" },
  openGraph: {
    title: "rithvik padma",
    description: "web & product engineer — fullstack, web3, and ai-powered products.",
    images: [{ url: "/avatar.jpeg", width: 400, height: 400, alt: "rithvik padma" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "rithvik padma",
    description: "web & product engineer — fullstack, web3, and ai-powered products.",
    images: ["/avatar.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#080b14] flex flex-col`}
        suppressHydrationWarning
      >
        <CommandPalette />
        <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
          <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-violet-600/[0.06] blur-3xl" />
          <div className="absolute bottom-0 -left-32 h-80 w-80 rounded-full bg-violet-600/[0.04] blur-3xl" />
        </div>
        <main className="relative mx-auto w-full max-w-2xl flex-1 px-6 pt-20 pb-10">
          {children}
        </main>
        <Footer />
        <FloatingDock />
      </body>
    </html>
  );
}
