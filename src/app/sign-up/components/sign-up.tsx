"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react"
import { useSendMail } from '@/hooks/useSendMail';
import useValidateUsername from "@/hooks/useValidateUsername"
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import Link from "next/link"
import bcrypt from "bcryptjs"
import useCreateUser from "@/hooks/useCreateUser"

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

        const [Created,setCreated] = useState(false)
        const {CreateUser} = useCreateUser()
        const [view1,setview1] = useState(false)
        const [view2,setview2] = useState(false)
        const [isSubmitting, setIsSubmitting] = useState(false)
        const [email, setEmail] = useState('');
        const [password1, setPassword1] = useState('');
        const [password1type, setpassword1type] = useState('password');
        const [password2type, setpassword2type] = useState('password');
        const [password2, setPassword2] = useState('');
        const [PasswordError,setPasswordError] = useState(false)
        const [username, setusername] = useState('');
        const [UserNameIsTaken, setUserNameIsTaken] = useState<boolean>(false);
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
                role: "user",
                reset_token: "",
                reset_token_expires:0,
                updatedAt: 0,
                lastLogin: 0
        })
        
        const { sendEmail, } = useSendMail();
        const  {CheckUsername} = useValidateUsername()
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
        const clearForm = ()=>{
                setEmail('');
                setPassword1('');
                setPassword2('');
                setusername('');
                setPhoneNumber('');
                setpasswordsDontMatch(false);
        }
 const ValidateUsername = async (name:string)=>{
        const response = await CheckUsername(name)
          if (!response.success) {
                                setUserNameIsTaken(true)
                                return
                        }
                        setUserNameIsTaken(false)
                        // setusername(name)
 }
  const handleUsernameChange =async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setusername(value)
        if(value.length>3){
              await ValidateUsername(value)
        } else{
                setUserNameIsTaken(false)
        }
       
        
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
                        console.log("hash",hashedPassword)
                        return hashedPassword;
                };

                const updateFormData = async () => {
                        const PasswordHash = await hashPassword(password1);
                        setformdata({
                                ...formdata,
                                username: username,
                                email: email,
                                phoneNumber: phoneNumber,
                                password: PasswordHash,
                        });
                };

                updateFormData();
        }, [password1, password2, username, email, phoneNumber])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  try {
                        const Res = await CreateUser({
                                ...User,
                                username: formdata.username,
                                email: formdata.email,
                                phoneNumber: formdata.phoneNumber,
                                passwordHash: formdata.password
                        })
                        if(!Res.success){
                                return  
                        }
                        setCreated(true)
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
                        // Handle This
                      alert(error)
                  } finally {
                    setIsSubmitting(false);
                    setTimeout(()=>{
                        setCreated(false)
                    },5000)
                  }}

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Welcome to <span className="text-dark" >Shop</span><span className="text-gold">Cheap</span> </h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your your Details below to create to your account
        </p>
        {Created && <p className="text-balance text-sm text-green-500">
          Success !  You acount has been created, please verify your email
        </p> }
      </div>
      <div className="grid gap-6 border p-6 rounded-lg shadow-lg dark:bg-black bg-slate-100 ">

       <div className="grid grid-cols-2 gap-3">
         <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" 
          type="text"
          value={username}
          onChange={handleUsernameChange}
          minLength={5}
          maxLength={10}
          placeholder="shopcheap"
           required />
           {username && username.length<5 && <h1 className="text-red-600 text-xs ">username should have atleast 5 characters </h1>}
           {UserNameIsTaken && <h1 className="text-red-600 text-xs "><span className="text-black dark:text-white" >{username}</span> is taken </h1>}
           {!UserNameIsTaken && username.length>4 &&  <h1 className="text-green-600 text-sm "><span className="text-black dark:text-white" >{username}</span> is available </h1>}
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
          minLength={10}
          value={phoneNumber}
         onChange={handlePhoneChange}
          placeholder="+256123456789"  
          required />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
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

        <Button type="submit" disabled={!username || !password1 || !password2|| UserNameIsTaken || PasswordError || passwordsDontMatch} className="w-full bg-dark dark:bg-gold ">
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
        <Link href="/sign-in" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </form>
  )
}
export default SignUpForm