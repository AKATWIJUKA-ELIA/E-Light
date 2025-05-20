"use client"
import { useEffect, useState } from "react";
import { useAction  } from "convex/react";
import { api } from "../../convex/_generated/api";
// import { action } from "../../convex/_generated/server";
type User = {
            username: string,
            email: string,
            passwordHash: string,
            phoneNumber: string,
            profilePicture: string,
            isVerified: boolean,
            role: string,
            reset_token: string,
            reset_token_expires:number,
            updatedAt: number,
            lastLogin: number,
      };
      type response={
        success:boolean
        message: string
        status:number
      }
      
const useAuthenticate = () => {
//   const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<response | null>(null);
//   const [error, setError] = useState<string | null>(null);

     const authenticate = useAction (api.users.AuthenticateUser);
    const Authenticate = async (email: string | "",password:string) => {
      try {
        
              const res = await authenticate({email,password})
        //       const data = res?.json();
        setData(res);
        if(!res.success){
                if(res?.status===404){
                        return { success: false, message: res.message};
                }
                // setError(data?.);
                if (res?.status === 401) {
                        return { success: false, message: res.message };
                }

        return { success: false, message:"Login failed" };
        }
          return { success: true, message: res.message };
      } catch (err) {
        return { success: false, message: "Internal Server Error" };
      } 
    };


  return {Authenticate };
};

export default useAuthenticate;