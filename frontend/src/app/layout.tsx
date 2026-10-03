import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";

export const metadata: Metadata = {
  title: "Web Học Ngoại Ngữ — IELTS & HSK Learning Platform",
  description: "Nền tảng học và luyện thi trực tuyến chuyên sâu cho IELTS và HSK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased selection:bg-primary selection:text-brand-dark">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
