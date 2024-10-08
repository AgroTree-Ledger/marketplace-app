import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import appConfig from "@/lib/config";
import { cn } from "@/lib/utils";
import AppProvider from "@/components/providers/AppProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const inter = localFont({
  src: "./fonts/Inter.woff2",
  display: "auto",
});
const manrope = localFont({
  src: "./fonts/Manrope.woff2",
  display: "auto",
});
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: appConfig.appTitle,
  description: appConfig.appDescription,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: appConfig.appBaseUrl,
  twitter: {
    card: "summary_large_image",
    title: appConfig.appTitle,
    description: appConfig.appDescription,
    creator: appConfig.appCreator,
    images: [
      {
        url: `${appConfig.appBaseUrl}/twitter-image`,
        width: 800,
        height: 418,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth dark"
      style={{
        colorScheme: "dark",
      }}
    >
      <body
        className={cn(
          inter.className,
          manrope.className,
          "antialiased min-h-screen"
        )}
      >
        <NextTopLoader />
        <main className="relative flex min-h-screen flex-col">
          <AppProvider>
            <div className="w-full relative">
              <Navbar />
              <main className="py-6 px-2 sm:px-4 lg:px-6 flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
