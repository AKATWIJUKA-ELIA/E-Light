import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/page";
import { Footer } from "@/components/Footer/page";
import ReduxProvider from "./ReduxProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/Dark-light/page";

export const metadata: Metadata = {
  title: "ShopCheap",
  description: "ShopCheap Anytime Anywhere",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConvexClientProvider>
          <ClerkProvider>
            <ReduxProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              > 
                <Header />
                {children}
                <Footer/>
                <ModeToggle />
              </ThemeProvider> 
            </ReduxProvider>
          </ClerkProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
