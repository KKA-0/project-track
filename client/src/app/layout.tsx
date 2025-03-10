import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import StoreProvider from './../libs/provider'
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diyan",
  description: "Keep in Track, Keep on Learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <StoreProvider>
            <Suspense fallback={<div>Loading...</div>}>
            {children}
            </Suspense>
          </StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
