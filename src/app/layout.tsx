import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ThemeProvider } from "@/components/theme-provider";
// import SessionChecker from "./sessionchecker";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { FileProvider } from "./FileContext";
import { DataProvider } from "./DataContext";
import { NotificationProvider } from "./NotificationContext";
import { ModeToggle } from "@/components/Dark-light/page";
import FeedBackButton from "@/components/FeedBackButton/page";
import Header from "@/components/Header/page";
import ConditionalFooter from "@/components/ConditionalFooter/page"
import MessagePop from "@/components/MessagePop/page";
import { BoostProvider } from "./BoostContext";

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
      <body className=" " >
        <ConvexClientProvider>
                <GoogleOAuthProvider clientId={CLIENT_ID}>
                        <NotificationProvider>
                                <BoostProvider>
                                <ReduxProvider>
                                        {/* <SessionChecker /> */}
                                        <ThemeProvider
                                                attribute="class"
                                                defaultTheme="system"
                                                enableSystem
                                                disableTransitionOnChange
                                        >
                                                <DataProvider>
                                                        <FileProvider>
                                                                <Header  />
                                                                <MessagePop />
                                                                {children}
                                                                <FeedBackButton/>
                                                                <ModeToggle />
                                                                <ConditionalFooter/>
                                                        </FileProvider>
                                                </DataProvider>
                                        </ThemeProvider> 
                                </ReduxProvider>
                                </BoostProvider>
                        </NotificationProvider>
                </GoogleOAuthProvider>
        </ConvexClientProvider>
      </body>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
    </html>
  );
}
