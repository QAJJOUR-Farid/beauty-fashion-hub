import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Viral Hub | Premium Beauty & Fashion Discoveries",
    template: "%s | Viral Hub"
  },
  description: "Curated collection of viral beauty and fashion trends handpicked from TikTok, Pinterest, and Instagram.",
  keywords: ["viral beauty", "fashion trends", "tiktok products", "skincare finds", "trending fashion"],
  authors: [{ name: "Viral Hub Editors" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#c6a355",
  openGraph: {
    title: "Viral Hub | Premium Beauty & Fashion Discoveries",
    description: "Curated collection of viral beauty and fashion trends handpicked from TikTok, Pinterest, and Instagram.",
    type: "website",
    siteName: "Viral Hub",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
