"use client"
import FisrtHero from "@/components/FirstHero/page";
import SecondHero from "@/components/SecondHero/page";
import Main from "@/components/Main/main";
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react";
import {store,persistor} from "@/store/store"
import MainHero from "@/components/MainHero/page";
export default function Home() {
  return (
        <Provider store={store}>
                <PersistGate persistor={persistor}>
                        <MainHero />
                        <SecondHero />
                        <FisrtHero />
                        <Main />
                </PersistGate>
 </Provider>
  );
}
