import { useAppDispatch } from "@/hooks";
import { addToCart } from "@/store/cart";
import useCart from '@/hooks/useCart';
import useRecordInteraction from "./useRecordInteraction";
import { Id } from "../../convex/_generated/dataModel";

 
const useAddToCart = ()=>{
         const { CreateCart } = useCart();
         const { record } = useRecordInteraction();
        const dispatch = useAppDispatch();
                return (product:{_id:Id<"products">})=> {dispatch(addToCart({
                        product_id: product._id,
                        quantity:1
                }))
                CreateCart({product_id: product._id, quantity: 1})
                record(product._id, "cart");
        }
        }
export default useAddToCart;