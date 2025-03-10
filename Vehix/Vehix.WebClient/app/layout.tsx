// /app/layout.tsx  #0a050f
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { Providers } from "./providers";

export const metadata = {
  title: "Vehix - Free Advanced Vehicle Management & Data Analytics Platform",
  description:
    "Vehix offers a free, comprehensive platform for vehicle management and data analytics. Access detailed information on vehicle brands, models, and more with our cutting-edge API. Perfect for developers, auto enthusiasts, and businesses looking to integrate car data into their applications at no cost. Start optimizing your automotive data management today, absolutely free.",
  "og:type": "website",
  "og:image": "https://www.vehixapi.com/favicon.png",
  "og:url": "https://www.vehixapi.com",
  robots: "index, follow",
  charset: "UTF-8",
  lang: "en",
  "theme-color": "#050709",
  keywords:
    "car data, car analytics, vehicle API, car data integration, automotive API, free vehicle data platform, car brands API, car models API, free car analytics, car database, free car management platform, auto enthusiasts, developers, business automotive solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <Providers>
            <div className="mt-20">
              <Navbar />
            </div>
            <div className="flex-grow bg-[#101113]">{children}</div>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
