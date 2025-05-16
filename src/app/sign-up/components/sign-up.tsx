"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaGoogle } from "react-icons/fa";
import { useState } from "react"
import { useSendMail } from '@/hooks/useSendMail';

interface user {
        username: string;
        email: string;
        password: string;
        password2:string;
        phoneNumber:string
}
const SignUpForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">)=> {

        const [isSubmitting, setIsSubmitting] = useState(false)
        const [User, setUser] = useState<user>({
                username: "",
                email: "",
                password:"",
                password2:"",
                phoneNumber:""
        })
        
        const { sendEmail, } = useSendMail();
         const admin = process.env.NEXT_PUBLIC_ADMIN


        
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
                    const { name, value } = e.target;
                    setUser((prev) => ({...prev,[name]: value,
                    }));
                  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Allow only digits, +, -, space
        const cleaned = value.replace(/[^0-9+]/g, "");
        User.phoneNumber= cleaned;
        handleChange(e)
};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  
                  const cleanForm = () => {
                        setUser({
                                username: "",
                                email: "",
                                phoneNumber: "",
                                password: "",
                                password2: "",
                        });
                        
                      };
                      
                  try {
                        
                      cleanForm()
                      sendEmail( `${admin}` ,"New User Created", `User ${User?.username}, Added a product`);
                      sendEmail( `${User?.email}`,"New Product Created", `Hello  ${User?.username}, Your Product was Created Successfully and is pending for Approval You will Be Notified Once Your Product is Approved`);
                
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
          value={User.username}
          onChange={handleChange}
          maxLength={10} 
          placeholder="shopcheap"
           required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" 
          type="email"
          value={User.email} 
          placeholder="example@gmail.com" 
          required
          onChange={handleChange} 
          />
        </div>
       </div>

        <div className="grid gap-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input id="phoneNumber" 
          type="tel" 
          maxLength={13}
          value={User.phoneNumber}
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
          onChange={handleChange}
          value={User.password}
           required
            />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmpassword">Confirm Password</Label>
          <Input 
          id="confirmpassword" 
          type="password"
          onChange={handleChange} 
          value={User.password2}
           required 
           />
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