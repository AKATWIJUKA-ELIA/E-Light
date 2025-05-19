"use client"
import { useEffect, useState } from "react";
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
      
const useAuthenticate = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);



    const Authenticate = async (email: string | "",password:string) => {
      try {
        const res = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: email,
                  password: password
                }),
              } );
              const data = await res.json();
        setUser(data);
        if(!res.ok){
                if(res.status===400){
                        return { success: false, message: data.message};
                }
                setError(data.message);
        

        if (res.status === 401) {
          return { success: false, message: data.message };
        }

        if (res.status === 404) {
          return { success: false, message: data.message };
        }
        if (res.status === 500) {
                return { success: false, message: data.message };
        }
        return { success: false, message: data.message || "Login failed" };
        }
        return { success: true, message: data.message };
      } catch (err) {
        setError((err as Error).message);
      } 
    };


  return {Authenticate, user,  error };
};

export default useAuthenticate;