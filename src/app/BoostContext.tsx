"use client";
import { createContext, useState,useContext } from "react";


interface Boost {
        product_ids: string[];
}


export const BoostContext = createContext<{
        boost: string[];
        setBoost: React.Dispatch<React.SetStateAction<string[]>>;
}>({
        boost: [] ,
        setBoost: () => {},
});

export const BoostProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
        const [boost, setBoost] = useState<string[]>([]);

        return (
                <BoostContext.Provider value={{ boost, setBoost }}>
                        {children}
                </BoostContext.Provider>
        );
};

export const useBoostContext = () => {
        const context = useContext(BoostContext);
        if (!context) {
                throw new Error("useBoost must be used within a BoostProvider");
        }
        return context;
};