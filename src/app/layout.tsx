import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { DashboardProvider } from "@/components/providers/DashboardProvider";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Analytics Dashboard",
  description: "A responsive, production-ready Admin Analytics Dashboard built with Next.js, TypeScript, Tailwind CSS, and Recharts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <DashboardProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </DashboardProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
