import { useAppDispatch } from "@/hooks";
import { DeleteCart } from "@/store/cart";
import useCart from "./useCart";
import { Id } from "../../convex/_generated/dataModel";

const useDeleteCart = ()=>{
        const { DeleteCart: deleteCart } = useCart();
        const dispatch = useAppDispatch();
                return (id:string)=> {dispatch(DeleteCart({
                        product_id: id,
                })),
                deleteCart(id as Id<"cart">) ;
        }
        }
export default useDeleteCart;