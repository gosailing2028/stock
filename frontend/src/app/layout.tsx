import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "股票分析系统",
  description: "静态部署到 GitHub Pages",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
