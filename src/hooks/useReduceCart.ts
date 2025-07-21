import { useAppDispatch } from "@/hooks";
import { ReduceCart } from "@/store/cart";
import useCart from '@/hooks/useCart';
import { Id } from "../../convex/_generated/dataModel";

const useReduceCart = ()=>{
        const dispatch = useAppDispatch();
        const { ReduceCart: reduceCart } = useCart();
                return (id:Id<"products">)=> {dispatch(ReduceCart({
                        product_id: id,
                        quantity:1
                }))
                reduceCart(id) ;
        }
        }
export default useReduceCart;