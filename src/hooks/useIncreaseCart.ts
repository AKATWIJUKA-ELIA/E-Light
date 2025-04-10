import { useAppDispatch } from "@/hooks";
import { IncreaseCart } from "@/store/cart";


const useIncreaseCart = ()=>{
        const dispatch = useAppDispatch();
                return (id:string)=> {dispatch(IncreaseCart({
                        product_id: id,
                        quantity: 1
                }))
        }
        }
export default useIncreaseCart;