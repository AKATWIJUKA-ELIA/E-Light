import { useAppDispatch } from "@/hooks";
import { IncreaseCart } from "@/store/cart";
import useCart from '@/hooks/useCart';

const useIncreaseCart = ()=>{
        const { IncreaseCart: increaseCart } = useCart();
        const dispatch = useAppDispatch();
                return (id:string)=> {dispatch(IncreaseCart({
                        product_id: id,
                        quantity: 1
                })),
                increaseCart(id) ;
        }
        }
export default useIncreaseCart;