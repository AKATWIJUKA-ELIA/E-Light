"use client"
import FisrtHero from "@/components/FirstHero/page";
import SecondHero from "@/components/SecondHero/page";
import Main from "@/components/Main/main";
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react";
import {store,persistor} from "@/store/store"
import MainHero from "@/components/MainHero/page";
import TopRatings from "@/components/TopRatings/main";
export default function Home() {
  return (
        <div className="" >
                <Provider store={store}>
                <PersistGate persistor={persistor}>
                        <MainHero />
                        <SecondHero />
                        <FisrtHero />
                        <TopRatings />
                        <Main />
                </PersistGate>
 </Provider>
        </div>
  );
}
