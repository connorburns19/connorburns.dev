import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { DotGrid } from "./_components/DotGrid";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Connor Burns",
  description: "Software engineer and freelance web developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="bg-zinc-950 text-zinc-100 antialiased font-sans">
        <DotGrid />
        {children}
      </body>
    </html>
  );
}
