import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Levente Istvan | Software Developer",
  description: "Portfolio of Levente Istvan, a software developer specializing in Golang and React. Explore my projects, skills, and contact information.",
  keywords: ["Levi", "Levente Istvan", "Backend Developer", "Fullstack Developer", "Software Developer", "Next.js", "Golang", "Python", "React", "Portfolio"],
  authors: [{ name: "Levente Istvan" }],
  creator: "Levente Istvan",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={inter.className}
      >
        {children}
      </body>
    </html>
  );
}
