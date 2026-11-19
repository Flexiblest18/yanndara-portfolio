import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Chhun Yanndara | IT Infrastructure Portfolio",
  description: "IT Support, Network and System Administration portfolio.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
