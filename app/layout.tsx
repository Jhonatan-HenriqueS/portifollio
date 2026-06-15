import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const display = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://seudominio.com"),
  title: "Jhonatan Henrique | Desenvolvedor Full-Stack",
  description:
    "Portfólio de Jhonatan Henrique — Desenvolvedor Full-Stack especializado em sistemas web robustos, landing pages de alta conversão e aplicações SaaS.",
  openGraph: {
    title: "Jhonatan Henrique | Desenvolvedor Full-Stack",
    description: "Sistemas reais, design de alto nível.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://seudominio.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-hidden bg-background font-body text-foreground">
        {children}
      </body>
    </html>
  );
}
