import { useAppDispatch } from "@/hooks";
import { ReduceCart } from "@/store/cart";
import useCart from '@/hooks/useCart';

const useReduceCart = ()=>{
        const dispatch = useAppDispatch();
        const { ReduceCart: reduceCart } = useCart();
                return (id:string)=> {dispatch(ReduceCart({
                        product_id: id,
                        quantity:1
                }))
                reduceCart(id) ;
        }
        }
export default useReduceCart;