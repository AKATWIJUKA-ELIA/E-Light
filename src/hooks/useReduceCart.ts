import { useAppDispatch } from "@/hooks";
import { ReduceCart } from "@/store/cart";


const useReduceCart = ()=>{
        const dispatch = useAppDispatch();
                return (id:string)=> {dispatch(ReduceCart({
                        product_id: id,
                        quantity:1
                }))
        }
        }
export default useReduceCart;