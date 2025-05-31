import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "./context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
});

export const metadata = {
  title: "My Next JS - Ecommerce project",
  description: "My Ecommerce Project",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <AppContextProvider>
        <Toaster />
        <html lang="en">
          <body className={`${outfit.className} antialiased`}>{children}</body>
        </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}
