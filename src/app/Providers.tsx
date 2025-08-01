"use client";

import ReduxProvider from "./ReduxProvider";
import { ConvexClientProvider } from "@/app/ConvexClientProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FileProvider } from "@/app/FileContext";
import { DataProvider } from "@/app/DataContext";
import { NotificationProvider } from "@/app/NotificationContext";
import { BoostProvider } from "@/app/BoostContext";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { fetchClientSecret } from "@/lib/helpers";

const CLIENT_ID = process.env.CLIENT_ID ?? "";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PROMISE_KEY??"" );

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ConvexClientProvider>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <CheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
          <NotificationProvider>
            <BoostProvider>
              <ReduxProvider>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                  <DataProvider>
                    <FileProvider>
                      {children}
                    </FileProvider>
                  </DataProvider>
                </ThemeProvider>
              </ReduxProvider>
            </BoostProvider>
          </NotificationProvider>
        </CheckoutProvider>
      </GoogleOAuthProvider>
    </ConvexClientProvider>
  );
}
