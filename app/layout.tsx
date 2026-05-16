import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { DotGrid } from "./_components/DotGrid";
import { BOOT_SCRIPT } from "./_lib/theme";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Connor Burns",
  description: "Software engineer and freelance web developer.",
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }}
          suppressHydrationWarning
        />
      </head>
      <body className="bg-bg text-text antialiased font-sans">
        <DotGrid />
        {children}
      </body>
    </html>
  );
}
