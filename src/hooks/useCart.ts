import { NextResponse } from "next/server";
import { api } from "../../convex/_generated/api"; 
import { useMutation } from "convex/react";
import { useAppSelector } from "@/hooks";
import { Id } from "../../convex/_generated/dataModel";
interface CartItem {
quantity: number,
product_id: string,
}

const useCart = () => {
        
        const create = useMutation(api.cart.createCart);
        const deleteCart = useMutation(api.cart.DeleteCart);
        const increaseCart = useMutation(api.cart.IncreaseCart);
        const reduceCart = useMutation(api.cart.ReduceCart);
        const User = useAppSelector((state) => state.user.user);
        const cartItems = useAppSelector((state) => state.cheapcart.items);

        const CreateCart = async (CartItem:CartItem) =>{
                
                try{
                if(!User || User.User_id.length === 0){
                        return { success: false, message: "User not authenticated", status: 401 };
                }
                const response = await create({CartItem:{...CartItem, cart_Owner_id: User?.User_id || ""}}); 
                 if(!response?.success){
                        return { success: false, message: response.message,status: 400 };
                }
                return { success: true, message:response.message,status: 200 }; 
                }catch{
                        return { success: false, message: "Sorry,  Can not upload at this time please try again later" };
                        
                }
        }
        const DeleteCart = async (product_id: Id<"cart">) => {
                try {
                        const response = await deleteCart({ id:product_id });
                        if (!response?.success) {
                                return { success: false, message: response.message, status: 400 };
                        }
                        return { success: true, message: response.message, status: 200  };
                } catch {
                        return { success: false, message: "Sorry, Can not delete at this time please try again later" };
                }
        }

        const IncreaseCart = async(Product_id: string) => {
                try {
                        console.log("Product_id", Product_id);
                        const response = await  increaseCart({ id:Product_id });
                        if (!response?.success) {
                                return { success: false, message: response.message , status: 400 };
                        }
                        return { success: true, message: response.message ,  status: 200 };
                } catch {
                        return { success: false, message: "Sorry, Can not increase at this time please try again later" };
                }
        }
        const ReduceCart = async(Product_id: string,) => {
                try {
                        const response = await reduceCart({ id:Product_id });
                        if (!response?.success) {
                                return { success: false, message: response.message , status: 400 };
                        }
                        return { success: true, message: response.message , status: 200 };
                } catch {
                        return { success: false, message: "Sorry, Can not reduce at this time please try again later",status: 500 };
                }
        }

        const SynchronizeCart = async () => {
                
                if(User && User.User_id.length > 0){
                for (const item of cartItems) {
                        await CreateCart(item);
                }}
        }

        return { 
                CreateCart,
                IncreaseCart,
                ReduceCart,
                DeleteCart,
                SynchronizeCart
         };
 }
 export default useCart;