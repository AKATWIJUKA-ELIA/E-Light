import Header from "@/components/Header/page";
import Image from "next/image";
import FisrtHero from "@/components/FirstHero/page";
import SecondHero from "@/components/SecondHero/page";
import Main from "@/components/Main/main";

export default function Home() {
  return (
    <div className="bg-white">
        <FisrtHero/>
        <SecondHero/>
        <Main/>
    </div>
  );
}
