import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/page";
import ReduxProvider from "./ReduxProvider";
import {ClerkProvider,} from '@clerk/nextjs'
import { ConvexClientProvider } from "./ConvexClientProvider";

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
