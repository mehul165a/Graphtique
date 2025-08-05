import type { Metadata } from "next";
import { Geist, Geist_Mono, Allura, Montserrat, Alfa_Slab_One } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-allura",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const AlfaSlabOne = Alfa_Slab_One({
  subsets: ["latin"],
  variable: "--font-alfa-slab-one",
  weight: "400"
})

export const metadata: Metadata = {
  title: "Graphtique - Creative Design Studio",
  description: "Creative Design Studio specializing in Graphic Design & UI/UX Design",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${allura.variable} ${montserrat.variable} ${AlfaSlabOne.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}