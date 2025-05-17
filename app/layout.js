import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "./context/AppContext";
import { Toaster } from "react-hot-toast";
import {
  ClerkProvider,
} from '@clerk/nextjs'

const outfit = Outfit({
  weights: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "QuickCart",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  description: "A modern e-commerce platform for quick shopping.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <AppContextProvider>
        <Toaster />
        <html lang="en" className={` ${outfit.className}`}>
          <body
            className={`${outfit.className} antialiased`}
          >
            {children}
          </body>
        </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}
