import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/page";
import ReduxProvider from "./ReduxProvider";
import {ClerkProvider,} from '@clerk/nextjs'
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/Dark-light/page";
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
     <html lang="en" suppressHydrationWarning>
       <body className="bg-white" >
        
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Header/>
            {children}
            <ModeToggle />
          </ThemeProvider>
       </body>
     </html>
     </ReduxProvider>
   </ClerkProvider>
   </ConvexClientProvider>
  );
}
