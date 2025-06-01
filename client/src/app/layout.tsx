import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import StoreProvider from './../libs/provider'
import { Suspense } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { TanStackProviders } from "@/utils/providers/tanstack.providers";
import Script from 'next/script'

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
        <GoogleOAuthProvider clientId="310626732775-10fe3ans7066vpu9g46aoi3o0atsffmm.apps.googleusercontent.com">
          <AppRouterCacheProvider>
            <StoreProvider>
              <Suspense fallback={<div>Loading...</div>}>
                <TanStackProviders>
                  {children}
                </TanStackProviders>
              </Suspense>
            </StoreProvider>
          </AppRouterCacheProvider>
        </GoogleOAuthProvider>
        <Script
          src="https://app.pocketsflow.com/pocketsflow-popup.js"
          data-subdomain="serverend"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
