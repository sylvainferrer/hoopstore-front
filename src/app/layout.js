import { Teko, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FlashMessageProvider from "@/context/FlashMessage";
import AuthProvider from "@/context/Auth";
import { Suspense } from "react";
import AuthQuerySync from "@/context/AuthQuerySync";

const tekoSans = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hoopstore - La référence du basketball en ligne",
  description: "Hoopstore est votre destination en ligne pour tout ce qui concerne le basketball.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${tekoSans.variable} ${openSans.variable} font-open text-body bg-light m-0 box-border p-0 antialiased`}>
        <AuthProvider>
          <Suspense fallback={null}>
            <AuthQuerySync />
          </Suspense>
          <FlashMessageProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              {children}
              <Footer />
            </div>
          </FlashMessageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
