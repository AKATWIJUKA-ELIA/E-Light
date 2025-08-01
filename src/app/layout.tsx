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
import {CheckoutProvider} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {fetchClientSecret} from "@/lib/helpers";
import ClientProviders from "./Providers";


export const metadata: Metadata = {
  title: "ShopCheap",
  description: "ShopCheap Anytime Anywhere",
};
const CLIENT_ID = process.env.CLIENT_ID ?? "";
const stripePromise = loadStripe(process.env.STRIPE_PROMISE_KEY ??"");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className=" " >
        <ClientProviders>
                <Header  />
                <MessagePop />
                {children}
                <FeedBackButton/>
                <ModeToggle />
                <ConditionalFooter/>
        </ClientProviders>
      </body>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
    </html>
  );
}
