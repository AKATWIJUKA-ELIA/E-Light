import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/page";
import ReduxProvider from "./ReduxProvider";
import FirstHero from "@/components/FirstHero/page"
import {
        ClerkProvider,
        SignInButton,
        SignedIn,
        SignedOut,
        UserButton
      } from '@clerk/nextjs'
      import { ConvexClientProvider } from "./ConvexClientProvider";
import SecondHero from "@/components/SecondHero/page";

export const metadata: Metadata = {
  title: "ShopCheap",
  description: "ShopCheap Anytime Anywhere",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <ConvexClientProvider>
     <ClerkProvider>
     <ReduxProvider>
     <html lang="en">
       <body className="bg-white" >
        <Header/>
         {children}
       </body>
     </html>
     </ReduxProvider>
   </ClerkProvider>
   </ConvexClientProvider>
  );
}
