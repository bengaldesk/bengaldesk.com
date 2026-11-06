import type { Metadata } from "next";
import { Noto_Serif_Bengali, Hind_Siliguri, Anek_Bangla, Inter } from "next/font/google";
import { NewsProvider } from "@/context/NewsContext";
import "./globals.css";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-noto-serif-bengali",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const anekBangla = Anek_Bangla({
  subsets: ["bengali"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-anek-bangla",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "দ্য বেঙ্গল ডেস্ক | The Bengal Desk",
  description: "বস্তুনিষ্ঠ, স্বাধীন ও নির্ভরযোগ্য সংবাদ মাধ্যম",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      className={`${notoSerifBengali.variable} ${hindSiliguri.variable} ${anekBangla.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-white text-gray-900 bn-ui antialiased selection:bg-red-700 selection:text-white">
        <NewsProvider>{children}</NewsProvider>
      </body>
    </html>
  );
}
