import { api } from "../../convex/_generated/api"; 
import { useMutation,useQuery } from "convex/react";
import { useAppSelector } from "@/hooks";
import { Id } from "../../convex/_generated/dataModel";


const useBookmark = () => {
        const User = useAppSelector((state) => state.user.user);
        const create = useMutation(api.bookmarks.createBookmark);
        const List = useQuery(api.bookmarks.ListBookmarks, { user_id: User?.User_id || "" });
        const Delete = useMutation(api.bookmarks.DeleteBookmark);
        

        const createBookmark = async (product_id:string) =>{
                
                try{
                if(!User || User.User_id.length === 0){
                        return { success: false, message: "User not authenticated", status: 401 };
                }
                const response = await create({Bookmark:{product_id, user_id: User?.User_id || ""}}); 
                 if(!response?.success){
                        return { success: false, message: response.message,status: 400 };
                }
                return { success: true, message:response.message,status: 200 }; 
                }catch{
                        return { success: false, message: "Sorry,  Can not do this action at this time please try again later" };
                        
                }
        }
        const ListBookmarks = async () => {
                return List;
        }

        const DeleteBookmark = async (product_id: Id<"bookmarks">) => {
                try {
                        const response = await Delete({ id:product_id });
                        if (!response?.success) {
                                return { success: false, message: response.message, status: 400 };
                        }
                        return { success: true, message: response.message, status: 200  };
                } catch {
                        return { success: false, message: "Sorry, Can not delete at this time please try again later" };
                }
        }

        return { 
                createBookmark,
                ListBookmarks,
                DeleteBookmark,
         };
 }
 export default useBookmark;