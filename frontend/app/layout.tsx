import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Web3Modal } from "@/context/Web3Modal";
import { Header } from "@/components/header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "eth-singapore-24",
  description: "project for ethglobal singapore hackathon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Web3Modal>
          <Header />
          {children}
        </Web3Modal>
      </body>
    </html>
  );
}
