import { api } from "../../convex/_generated/api"; 
import { useMutation, useQuery } from "convex/react";
import { useAppSelector } from "@/hooks";
import { Boost, Product,BoostWithInteraction,Interaction } from "@/lib/utils";
import useGetProductsByIds from "./useGetProductsByIds";
import { useEffect, useState } from "react";

type MergedInteraction = {
  product_id: string;
  types: { [type: string]: number }; // e.g. { view: 3, cart: 2 }
};
const useBoost = () => {
        const mergeInteractions = (interactions: Interaction[]): MergedInteraction[] => {
  const result: { [productId: string]: MergedInteraction } = {};

  interactions.forEach((interaction) => {
    const { product_id, type, count } = interaction;

    if (!result[product_id]) {
      result[product_id] = {
        product_id,
        types: { [type]: count },
      };
    } else {
      // If type exists, increment; else set initial
      if (result[product_id].types[type]) {
        result[product_id].types[type] += count;
      } else {
        result[product_id].types[type] = count;
      }
    }
  });

  return Object.values(result);
};

        const [BoostedProducts, setBoostedProducts] = useState<BoostWithInteraction[]|null>([])
        const User = useAppSelector((state) => state.user.user);
        const boost = useMutation(api.products.BoostProducts);
        const ids = useQuery(api.products.getBoostedProductsIds, { user_id: User?.User_id || "" });
        const interactions = useQuery(api.products.getInteractionsbyProductIds,  { product_ids: ids ?? [] } )
        const merged = mergeInteractions(interactions || []);

        useEffect(() => {
  console.log("Merged Interactions:", merged);
}, [interactions]);

        const { data: products,loading } = useGetProductsByIds(ids ? ids.flat() : []);
        
        const boostedProductsWithInteractions = products?.map((product) => {
                const interaction = interactions?.find((i) => i.product_id === product?._id);
                return { ...product, interaction } as BoostWithInteraction;
        });

        useEffect(() => {
        if (products) {
        setBoostedProducts(boostedProductsWithInteractions||[]);
        }
        }, [interactions,]);
//   console.log("Fetched Boosts:", boostedProductsWithInteractions);
        const boostProduct = async (boostItem:Boost) =>{

                try{
                        if(!User || User.User_id.length === 0){
                                return { success: false, message: "User not authenticated", status: 401 };
                }

                const response = await boost({...boostItem, user_id: User?.User_id || ""});
                 if(!response?.success){
                        return { success: false, message: response.message,status: 400 };
                }
                return { success: true, message:response.message,status: 200 }; 
                }catch{
                        return { success: false, message: "Sorry,  Can not boost at this time please try again later" };
                        
                }
        }
        return { boostProduct,BoostedProducts };
}
export default useBoost;