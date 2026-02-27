import type { Metadata } from "next";

export const metadata: Metadata = { title: "contact" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
