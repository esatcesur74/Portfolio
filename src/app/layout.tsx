import type { Metadata } from "next";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Esat Cesur | Frontend-Heavy Fullstack Developer",
  description: "The portfolio and selected work of Esat Cesur, a frontend developer and designer based in Oslo.",
  icons: { icon: "/images/realisticsiyah3.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
