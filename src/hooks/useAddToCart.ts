import { useAppDispatch } from "@/hooks";
import { addToCart } from "@/store/cart";


const useAddToCart = ()=>{
        const dispatch = useAppDispatch();
                return (product:{_id:string})=> {dispatch(addToCart({
                        product_id: product._id,
                        quantity:1
                }))
        }
        }
export default useAddToCart;
        