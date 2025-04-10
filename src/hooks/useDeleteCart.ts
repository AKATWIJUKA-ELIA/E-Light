import { useAppDispatch } from "@/hooks";
import { DeleteCart } from "@/store/cart";


const useDeleteCart = ()=>{
        const dispatch = useAppDispatch();
                return (id:string)=> {dispatch(DeleteCart({
                        product_id: id,
                }))
        }
        }
export default useDeleteCart;