"use client"
import FisrtHero from "@/components/FirstHero/page";
import SecondHero from "@/components/SecondHero/page";
import Main from "@/components/Main/main";
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react";
import {store,persistor} from "@/store/store"
import MainHero from "@/components/MainHero/page";
import Header from "@/components/Header/page";
import useGetCategories from '@/hooks/useGetCategories';
import useGetApprovedProducts from '@/hooks/useGetApprovedProducts';
import { Oval } from "react-loader-spinner";
export default function Home() {
        const { data: categories } = useGetCategories();
        const { data: products } = useGetApprovedProducts();
  return (
        <Provider store={store}>
                <PersistGate persistor={persistor}>
                {categories && products ? (
                        <div className="bg-white dark:bg-black overflow-x-hidden fades-in">
                                <MainHero  product={products||[]}/>
                                <SecondHero product={products||[]}/>
                                <FisrtHero product={products||[]}/>
                                <Main productsData={products||[]}/>
                                
                        </div>
                        ):(
                        <div className=' flex justify-center   items-center h-screen  fades-in   '
                        style={{overflow: 'hidden', backgroundImage: `url("images/Logo1.png")`,
                        backgroundSize:'',
                        backgroundPosition: 'center' }}
                        >
                                <div className="gap-4 flex justify-center   items-center  bg-neutral-200 opacity-95 w-[100%] h-[100%] ">
                                <div className="flex animate-pulse ">
                                        
                                        <div className="flex"><h1 className='text-2xl text-dark  '>Sh</h1></div>
                                        <div className="flex"><Oval
                                        visible={true}
                                        height="30"
                                        width="30"
                                        color="#0000FF"
                                        secondaryColor="#FFD700"
                                        ariaLabel="oval-loading"
                                        
                                        />
                                        </div>
                                        <div className="flex text-2xl text-dark  ">p<span className="text-gold">Cheap</span>.  .  .</div>
                                </div>
                                </div>
                        </div>
                        )
                }
                </PersistGate>
 </Provider>
  );
}
