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
  title: "Siar Esat Cesur",
  description: "IT graduate and entrepreneur based in Oslo, Norway. Building websites, brands, and digital experiences.",
  openGraph: {
    title: "Siar Esat Cesur",
    description: "IT graduate and entrepreneur based in Oslo, Norway. Building websites, brands, and digital experiences.",
    url: "https://siaresatcesur.eu",
    siteName: "Siar Esat Cesur",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siar Esat Cesur",
    description: "IT graduate and entrepreneur based in Oslo, Norway. Building websites, brands, and digital experiences.",
  },
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
