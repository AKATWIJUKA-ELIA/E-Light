import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/page";
import { Footer } from "@/components/Footer/page";
import ReduxProvider from "./ReduxProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/Dark-light/page";
import { GoogleOAuthProvider } from '@react-oauth/google';
import FeedBack from "@/components/FeedBack/page";
import { FileProvider } from "./FileContext";

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
              <FileProvider>
                <Header />
                {children}
                <FeedBack/>
                <Footer/>
                </FileProvider>
                <ModeToggle />
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
