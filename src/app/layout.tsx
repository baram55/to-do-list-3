import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import QueryProvider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "todo-list-3",
  description: "hello world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <nav>
          <Link href="/about">About</Link>
          <Link href="/report">Report</Link>
          <Link href="/todos-csr">Todos-csr</Link>
          <Link href="/todos-ssr">Todos-ssr</Link>
        </nav>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
