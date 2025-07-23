"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import useChangePasswordWithToken from "@/hooks/useChangePasswordWithToken";
        
const ChangePassword = ({  className,
  ...props}:React.ComponentPropsWithoutRef<"form">) => {
  const router = useRouter();

          const [view1,setview1] = useState(false)
          const [view2,setview2] = useState(false)
          const [isSubmitting, setIsSubmitting] = useState(false)
          const[SubmittingError,setSubmittingError] = useState("")
         const [Created,setCreated] = useState("")
          const [password1, setPassword1] = useState('');
          const [password1type, setpassword1type] = useState('password');
          const [password2type, setpassword2type] = useState('password');
          const [password2, setPassword2] = useState('');
          const [PasswordError,setPasswordError] = useState(false)
          const [PasswordHash,setPasswordHash] = useState("")
          const [passwordsDontMatch, setpasswordsDontMatch] = useState(false);
          const {CheckUser} = useChangePasswordWithToken()


//   useEffect(() => {
    
//     const urlParams = new URLSearchParams(window.location.search);
//     const tokenFromUrl = urlParams.get("3c59c3c631572e859cbZZV05c6d4D637ad496d67b04ea8b0553ae4e1454933d27caf");
//     if (tokenFromUrl) {
//         console.log("Token",tokenFromUrl)
//       setToken(tokenFromUrl);
//     } else {
   
//       router.push("/error");
//     }
//   }, [router]);

          const HandleView = (type:string)=>{
                if(type==="password1"){
                        setview1(true)
                        setpassword1type("text")
                }else if(type==="password2"){
                        setview2(true)
                        setpassword2type("text")
                }
                
        }
                const HandleHide = (type:string)=>{
                        if(type==="password1"){
                        setview1(false)
                        setpassword1type("password")
                }else if(type==="password2"){
                        setview2(false)
                        setpassword2type("password")
                }
        }

        const handlePassword1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                setPassword1(value);
                const isValidPassword =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
                
                if (!isValidPassword) {
                        setPasswordError(true);
                } else {
                        setPasswordError(false); // Clear error if valid
                        }
                };

const handlePassword2Change = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value;
        setPassword2(value)
}

        useEffect(() => {
                if (password1 != password2) {
                        setpasswordsDontMatch(true)
                        return
                }
                setpasswordsDontMatch(false)

                const hashPassword = async (plainPassword: string) => {
                        const saltRounds = 10;
                        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
                        // console.log("hash",hashedPassword)
                        return hashedPassword;
                };

                const updatePassword = async () => {
                        const HashedPassword = await hashPassword(password1);
                        setPasswordHash(HashedPassword)
                };

                updatePassword();
        }, [password1, password2,])

  const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl =  urlParams.get("3c59c3c631572e859cbZZV05c6d4D637ad496d67b04ea8b0553ae4e1454933d27caf");
//     console.log("TOKEN IS", tokenFromUrl)
    if (!tokenFromUrl) {
      console.error("Token is missing!");
//       return;
    }
    setIsSubmitting(true)

    try {
        const response = await CheckUser(tokenFromUrl||"",PasswordHash)
      if (!response.success) {
        setIsSubmitting(false)
        setSubmittingError(response.message)
        
        return
      } 
      setCreated(response.message)
      setTimeout(()=>{
                router.push("/sign-in")
        },5000)

    } catch {
      return
    } finally {
        setIsSubmitting(false)
        setTimeout(()=>{
                setSubmittingError("")
        },5000)

    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4"> Password Reset Wizard</h1>
 <form onSubmit={handleResetPassword} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-balance text-sm text-muted-foreground">
          Change Your Password
        </p>
        {Created && <p className="text-balance text-sm text-green-500">
          Success !  You Password has been Changed Successfully
        </p> }
        {SubmittingError  && SubmittingError.length>0  && <p className="text-balance text-sm text-red-500">
          Error !  {SubmittingError}
        </p> }
      </div>


        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">New Password</Label>
          </div>
          <div className="relative" >
          <Input 
          id="password" 
          type={password1type}
          maxLength={16}
          minLength={8}
          onChange={handlePassword1Change}
          value={password1}
           required
            />
            {view1 ?(
                <IoEye  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={()=>HandleHide("password1")}  />
                ):(
                        <IoMdEyeOff 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={()=>HandleView("password1")}
                />
                )}
                </div>
            {PasswordError  &&  <h1 className="text-red-500 text-xs" >Password must be at least 8 characters, include upper and lower case letters, and a number</h1>}
        </div>

                <div className="grid gap-2">
                <Label htmlFor="confirmpassword">Confirm Password</Label>
                <div className="relative">
                <Input
                id="confirmpassword"
                minLength={8}
                maxLength={16}
                type={password2type}
                onChange={handlePassword2Change}
                value={password2}
                required
                className="pr-10" // Add padding to the right to avoid overlap with the icon
                />
                {view2 ?(
                <IoEye  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={()=>HandleHide("password2")}  />
                ):(
                        <IoMdEyeOff
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={()=>HandleView("password2")}
                />
                )}
                </div>
                {passwordsDontMatch && (
                <h1 className="text-red-600 text-sm">passwords don&apos;t match</h1>
                )}
                </div>

        <Button type="submit" disabled={!password1 || !password2 || PasswordError || passwordsDontMatch} className="w-full bg-dark dark:bg-gold ">
          {isSubmitting?"Submitting":"Change Password"}
        </Button>
    </form>
    </div>
  );
};

export default ChangePassword;