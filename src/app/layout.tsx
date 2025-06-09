import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { FileProvider } from "./FileContext";
import { DataProvider } from "./DataContext";
import { ModeToggle } from "@/components/Dark-light/page";
import FeedBackButton from "@/components/FeedBackButton/page";
import { Footer } from "@/components/Footer/page";
import Header from "@/components/Header/page";

export const metadata: Metadata = {
  title: "ShopCheap",
  description: "ShopCheap Anytime Anywhere",
};
const CLIENT_ID = process.env.CLIENT_ID ?? "";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConvexClientProvider>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <ClerkProvider>
            <ReduxProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              > 
              <DataProvider>
              <FileProvider>
                <Header  />
                {children}
                <FeedBackButton/>
                <ModeToggle />
                <Footer/>
                </FileProvider>
                  </DataProvider>
              </ThemeProvider> 
            </ReduxProvider>
          </ClerkProvider>
          </GoogleOAuthProvider>
        </ConvexClientProvider>
      </body>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
    </html>
  );
}
