import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Banner } from "@/components/banner";
import { ModalProvider } from "@/providers/modal-provider";
import { Footer } from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const gabarito = Gabarito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "SnapshotYourWebsite - Capture High-Quality Screenshots and Videos of Any Website",
  description:
    "SnapshotYourWebsite lets you easily capture high-quality screenshots of any website. Perfect for archiving, presentations, or sharing with clients. Take snapshots in seconds that showcase entire pages from top to bottom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={gabarito.className}>
        <Analytics />
        <Toaster position="top-center" />
        <ModalProvider />
        <Toaster position="top-center" />
        <Banner>Quick, Clear, and Free Website Snapshots - Try It Now!</Banner>
        <div className="container mx-auto flex flex-col min-h-full">
          {children}
          <Footer />
        </div>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "nvgsnyfld1");`}
        </Script>
      </body>
    </html>
  );
}
