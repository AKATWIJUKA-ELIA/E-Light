"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import useForgotPassword from "@/hooks/useForgotPassword"
import { useRouter } from "next/navigation";


const ForgotPassword=({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">)=>{
        const {CheckUser} = useForgotPassword()
        const[IsSubmitting,setIsSubmitting] = useState(false)
        const[SubmittingError,setSubmittingError] = useState("")
        const[SuccessMessage,setSuccessMessage] = useState("")
        const[Email, setEmail] = useState('')

        const router = useRouter();


        const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
                e.preventDefault();
                setIsSubmitting(true);
                try{
                const res = await CheckUser(Email)
                if(!res?.success){
                        setSubmittingError(res?.message)
                        setIsSubmitting(false)
                        return
                }
                setIsSubmitting(false)
                setSuccessMessage(`${res?.message}\nyou will be redirected to sign-in`)
                setTimeout(()=>{
                        router.push("/sign-in")
                },5000)
        }catch(error){
                console.error(error)
                setSubmittingError("UnExpected Error sorry it's not your fault.\nwe are working on it")
                setIsSubmitting(false)
        }finally{
                setIsSubmitting(false)
                setTimeout(()=>{
                        setSubmittingError("")
                },10000)
        }
        }

  return (
    <form onSubmit={HandleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold"><span className="text-gold" >Forgot Your </span> Password ? </h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to Reset  your  Password
        </p>
        {SubmittingError && SubmittingError.length>0 && <p className="text-balance text-sm text-red-500">
          {SubmittingError}
        </p>}
        {SuccessMessage && SuccessMessage.length>0 && <p className="text-balance text-sm text-green-500">
          {SuccessMessage}
        </p>}
      </div>
      <div className="grid gap-6 border p-6 rounded-lg shadow-lg dark:bg-black bg-slate-100 ">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email"
           type="email"
           value={Email}
           onChange={(e) =>setEmail(e.target.value)}
            placeholder="m@example.com"
             required />
        </div>

        <Button type="submit" disabled={Email.length == 0 } className="w-full bg-dark dark:bg-gold ">
          {IsSubmitting ? "Sending...":"Send Link"}
        </Button>

      </div>
    </form>
  )
}
export default ForgotPassword;