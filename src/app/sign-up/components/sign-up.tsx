import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaGoogle } from "react-icons/fa";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Welcome to <span className="text-dark" >Shop</span><span className="text-gold">Cheap</span> </h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your your Details below to create to your account
        </p>
      </div>
      <div className="grid gap-6 border p-6 rounded-lg shadow-lg dark:bg-black bg-slate-100 ">

       <div className="grid grid-cols-2 gap-3">
         <div className="grid gap-2">
          <Label htmlFor="email">User name</Label>
          <Input id="text" type="email" placeholder="shopcheap" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="example@gmail.com" required />
        </div>
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
          <Input id="password" type="password" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Confirm Password</Label>
          <Input id="confirmpassword" type="password"  required />
        </div>

        <Button type="submit" className="w-full bg-dark dark:bg-gold ">
          SignUp
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
