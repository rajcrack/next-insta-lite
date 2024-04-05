import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header/Header";
import SessionWrapper from "@/components/session/SessionWrapper";
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: {
    default: "Inta Lite",
    template: "%s | Lite"
  },
  description: "Programmed by @Rishabh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <SessionWrapper>

      <html lang="en">
        <body className={inter.className}>
          <NextTopLoader color="#2299DD"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD" />
          <Header />
          {children}</body>
      </html>
    </SessionWrapper>

  );
}
