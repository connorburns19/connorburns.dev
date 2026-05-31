import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playbook — interactive demo",
  description:
    "Playbook — a tiny TypeScript library for creating, saving, and animating American Football play diagrams. Live interactive demo.",
};

export default function PlaybookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
