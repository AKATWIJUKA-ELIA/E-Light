"use client"
import FisrtHero from "@/components/FirstHero/page";
import SecondHero from "@/components/SecondHero/page";
import Main from "@/components/Main/main";
import { Provider } from "react-redux"
import {store} from "@/store/store"
export default function Home() {
  return (
        <Provider store={store}>
    <div className="bg-white">
        <FisrtHero/>
        <SecondHero/>
        <Main/>
    </div>
 </Provider>
  );
}
