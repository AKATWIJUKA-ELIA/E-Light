import { useAppDispatch } from "@/hooks";
import { addToCart } from "@/store/cart";
import useCart from '@/hooks/useCart';
import useRecordInteraction from "./useRecordInteraction";

 
const useAddToCart = ()=>{
         const { CreateCart } = useCart();
         const { record } = useRecordInteraction();
        const dispatch = useAppDispatch();
                return (product:{_id:string})=> {dispatch(addToCart({
                        product_id: product._id,
                        quantity:1
                }))
                CreateCart({product_id: product._id, quantity: 1})
                record(product._id, "cart");
        }
        }
export default useAddToCart;