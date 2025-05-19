"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react"
import { useSendMail } from '@/hooks/useSendMail';
import { api } from "../../../../convex/_generated/api"
import { useMutation } from "convex/react";

interface user {
        username: string,
        email: string,
        passwordHash: string,
        phoneNumber: string,
        profilePicture:string,
        isVerified: boolean,
        role: string,
        reset_token: string,
        reset_token_expires:number,
        updatedAt: number,
        lastLogin: number,
}
interface formdata{
        username: string,
        email: string,
        password: string,
        phoneNumber: string,
}
const SignUpForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">)=> {

        const CreateUser = useMutation(api.users.CreateUser)
        const [isSubmitting, setIsSubmitting] = useState(false)
        const [email, setEmail] = useState('');
        const [password1, setPassword1] = useState('');
        const [password2, setPassword2] = useState('');
        const [username, setusername] = useState('');
        const [phoneNumber, setPhoneNumber] = useState('');
        const [passwordsDontMatch, setpasswordsDontMatch] = useState(false);
        const [formdata, setformdata] = useState<formdata>({
                username: '',
                email: '',
                password: '',
                phoneNumber: '',
        })
        const [User, setUser] = useState<user>({
                username: "",
                email: "",
                passwordHash:"",
                phoneNumber:"",
                profilePicture:"",
                isVerified: false,
                role: "",
                reset_token: "",
                reset_token_expires:0,
                updatedAt: 0,
                lastLogin: 0
        })
        
        const { sendEmail, } = useSendMail();
         const admin = process.env.NEXT_PUBLIC_ADMIN

        const resetUser = () => {
                        setUser({
                                username: "",
                                email: "",
                                phoneNumber: "",
                                passwordHash: "",
                                profilePicture: "",
                                isVerified: false,
                                role: "",
                                reset_token: "",
                                reset_token_expires: 0,
                                updatedAt: 0,
                                lastLogin: 0
                        });
                        
                      };
        const clearForm = ()=>{
                setEmail('');
                setPassword1('');
                setPassword2('');
                setusername('');
                setPhoneNumber('');
                setpasswordsDontMatch(false);
        }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setusername(value)
        
};
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Allow only digits, +, -, space
        const cleaned = value.replace(/[^0-9+]/g, "");
         setPhoneNumber(cleaned);
};
const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value;
        setEmail(value)
}

const handlePassword1Change = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value;
        setPassword1(value)
        
}

const handlePassword2Change = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value;
        setPassword2(value)
}

        useEffect(()=>{
                if(password1!=password2){
                setpasswordsDontMatch(true)
                return
                }
                setpasswordsDontMatch(false)
                setformdata({
                        ...formdata,
                        username:username,
                        email:email,
                        phoneNumber:phoneNumber,
                        password: password1,
                })
        },[password1,password2,username,email,phoneNumber])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  try {
                        await CreateUser({
                                ...User,
                                username: formdata.username,
                                email: formdata.email,
                                phoneNumber: formdata.phoneNumber,
                                passwordHash: formdata.password
                        })

                      sendEmail( `${admin}` ,"New User Created", `User ${formdata.username}, was Created `);
                      sendEmail( `${formdata.email}`,"Welcome to ShopCheap", `Hello  ${formdata.username}, 

Thank you for Joining us at  ShopCheap! We're thrilled to have you on board.

Subscribe to our News Letter to be the first to receive exclusive updates, tips, promotions, or industry insights And Expect valuable content delivered straight to your inbox .

If you ever have questions or feedback, just reply to this email—we'd love to hear from you!\n

Thanks again for joining us.\n

Best regards,\n
ShopCheap\n
https://shopcheap.vercel.app/`)
resetUser()
clearForm()
                
                  } catch (error) {
                      
                  } finally {
                    setIsSubmitting(false);
                  }}

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Welcome to <span className="text-dark" >Shop</span><span className="text-gold">Cheap</span> </h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your your Details below to create to your account
        </p>
      </div>
      <div className="grid gap-6 border p-6 rounded-lg shadow-lg dark:bg-black bg-slate-100 ">

       <div className="grid grid-cols-2 gap-3">
         <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" 
          type="text"
          value={username}
          onChange={handleUsernameChange}
          maxLength={10} 
          placeholder="shopcheap"
           required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" 
          type="email"
          value={email} 
          placeholder="example@gmail.com" 
          required
          onChange={handleEmailChange} 
          />
        </div>
       </div>

        <div className="grid gap-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input id="phoneNumber" 
          type="tel" 
          maxLength={13}
          value={phoneNumber}
         onChange={handlePhoneChange}
          placeholder="+256123456789"  
          required />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input 
          id="password" 
          type="password"
          onChange={handlePassword1Change}
          value={password1}
           required
            />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmpassword">Confirm Password</Label>
          <Input 
          id="confirmpassword" 
          type="password"
          onChange={handlePassword2Change} 
          value={password2}
           required 
           />
           { passwordsDontMatch && <h1 className="text-red-600 text-sm">passwords don&apos;t match</h1>}
        </div>

        <Button type="submit" className="w-full bg-dark dark:bg-gold ">
          {isSubmitting?"Submitting":"Sign Up"}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <FaGoogle />
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/sign-in" className="underline underline-offset-4">
          Sign in
        </a>
      </div>
    </form>
  )
}
export default SignUpForm