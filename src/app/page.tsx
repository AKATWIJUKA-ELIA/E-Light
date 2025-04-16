"use client"
import FisrtHero from "@/components/FirstHero/page";
import SecondHero from "@/components/SecondHero/page";
import Main from "@/components/Main/main";
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react";
import {store,persistor} from "@/store/store"
export default function Home() {
  return (
        <Provider store={store}>
                <PersistGate persistor={persistor}>
                <div className="bg-white overflow-x-hidden">
                <FisrtHero/>
                <SecondHero/>
                <Main/>
                </div>
                </PersistGate>
 </Provider>
  );
}
