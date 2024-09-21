import "./globals.css";

import clsx from "clsx";
import type { Metadata } from "next";
import { Inter, Nunito, Playfair_Display } from "next/font/google";
import Header from "./components/main-layout/header";
import Footer from "./components/main-layout/footer";
export const metadata: Metadata = {
  title: "URL shortener",
  description: "URL shortener",
};

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.variable,
          playfairDisplay.variable,
          nunito.variable,
        )}
      >
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
