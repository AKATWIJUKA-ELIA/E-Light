import { useAppDispatch } from "@/hooks";
import { SaveUser } from "@/store/customer";
interface User {
        User_id: string;
        Username: string;
        role:string,
        profilePicture:string,
        isVerified:boolean,
}
const useSaveUser = ()=>{
        const dispatch = useAppDispatch();
        return (user:User)=>{
                dispatch(SaveUser(user))
        }
}
export default useSaveUser