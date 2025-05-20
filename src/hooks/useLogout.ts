import { useAppDispatch } from "@/hooks";
import { DeleteUser } from "@/store/customer";

const useLogout = async ()=>{
        const dispatch = useAppDispatch();
                        return dispatch(DeleteUser())
              
}
export default useLogout