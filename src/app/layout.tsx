import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BlackDataProvider } from "@/context/BlackDataContext";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Art of Benjamin Black",
  description:
    "A collection of fine artwork by Benjamin Black in a variety of mediums.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col w-full h-screen`}
      >
        <BlackDataProvider>
          <Navigation />
          {children}
          <Footer />
        </BlackDataProvider>
      </body>
    </html>
  );
}
