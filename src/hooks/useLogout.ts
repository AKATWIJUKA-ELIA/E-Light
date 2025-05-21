import { useAppDispatch } from "@/hooks";
import { DeleteUser } from "@/store/customer";

const useLogout = () => {
  const dispatch = useAppDispatch();
   const LogOut = async ()=>{
                try {
                        const response = await fetch('/api/logout', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                        });
                        if (!response.ok) {
                                throw new Error('Failed to delete session');
                        }
                } catch (error) {
                        console.error('Error during session creation:', error);
                }
        }
        
  return () => {
    dispatch(DeleteUser());
    LogOut()
  };
};

export default useLogout;