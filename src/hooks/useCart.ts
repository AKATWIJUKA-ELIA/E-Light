import { NextResponse } from "next/server";
import { api } from "../../convex/_generated/api"; 
import { useMutation } from "convex/react";
interface CartItem {
quantity: number,
product_id: string,
product_owner_id: string,
}
const useCart = () => {
        const create = useMutation(api.cart.createCart);

        const CreateCart = async (CartItem:CartItem) =>{
                try{
                const response = await create({CartItem:CartItem});
                 if(!response?.success){
                        return NextResponse.json({ success: false, message: response.message }, { status: 400 });
                }
                return NextResponse.json({ success: true, message:response.message }, { status: 200 });
                }catch{
                        return NextResponse.json( { success: false, message: "Sorry,  Can not upload at this time please try again later" });
                        
                }
        }
        // const DeleteCart = async (product_id: string) => {
        //         try {
        //                 const response = await deleteCart({ product_id });
        //                 if (!response?.success) {
        //                         return NextResponse.json({ success: false, message: response.message }, { status: 400 });
        //                 }
        //                 return NextResponse.json({ success: true, message: response.message }, { status: 200 });
        //         } catch {
        //                 return NextResponse.json({ success: false, message: "Sorry, Can not delete at this time please try again later" });
        //         }
        // const IncreaseCart = async(Product_id: string, quantity: number) => {
        //         try {
        //                 const response = await api.cart.increaseCart({ Product_id, quantity });
        //                 if (!response?.success) {
        //                         return NextResponse.json({ success: false, message: response.message }, { status: 400 });
        //                 }
        //                 return NextResponse.json({ success: true, message: response.message }, { status: 200 });
        //         } catch {
        //                 return NextResponse.json({ success: false, message: "Sorry, Can not increase at this time please try again later" });
        //         }
        // }
        // const ReduceCart = async(Product_id: string, quantity: number) => {
        //         try {
        //                 const response = await api.cart.reduceCart({ Product_id, quantity });
        //                 if (!response?.success) {
        //                         return NextResponse.json({ success: false, message: response.message }, { status: 400 });
        //                 }
        //                 return NextResponse.json({ success: true, message: response.message }, { status: 200 });
        //         } catch {
        //                 return NextResponse.json({ success: false, message: "Sorry, Can not reduce at this time please try again later" });
        //         }
        // }

        return { CreateCart,
                // IncreaseCart,
                // ReduceCart,
                // DeleteCart
         };
 }
 export default useCart;