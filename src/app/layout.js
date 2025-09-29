import { Teko, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UserNameProvider } from "@/context/UserName";
import { FlashMessageProvider } from "@/context/FlashMessage";

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
      <body className={`${tekoSans.variable} ${openSans.variable} antialiased`}>
        <UserNameProvider>
          <FlashMessageProvider>
            <Header />
            {children}
            <Footer />
          </FlashMessageProvider>
        </UserNameProvider>
      </body>
    </html>
  );
}
