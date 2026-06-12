import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskFlow - Manage your daily tasks efficiently",
  description: "A premium task management app to boost your productivity. Keep track of priorities, statuses, and due dates all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        {children}
      </body>
    </html>
  );
}
