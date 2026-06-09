import type { Metadata } from "next";
import { Inter, Ballet } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Timeline from "@/components/Timeline";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const ballet = Ballet({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Your Name — Portfolio",
  description:
    "Personal portfolio of a Computer Science Student & Developer. Showcasing projects, skills, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ballet.variable} antialiased`}>
        <SmoothScroll />
        <CustomCursor />
        <Timeline />
        {children}
      </body>
    </html>
  );
}
