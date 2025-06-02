"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader,  } from "@/components/ui/card"
import { TiTick } from "react-icons/ti";
import { useSendMail } from "@/hooks/useSendMail"

const  FeedBack = ()=> {
        const[sending, setsending] = useState(false)
        const [Alert, setAlert] = useState(false)
        const [Error, setError] = useState(false)
        const {sendEmail} = useSendMail()
        const Admin = process.env.NEXT_PUBLIC_ADMIN ||""
        const [formData, setFormData] = useState({

    email: "",
    subject:"",
    message: "",
  })
  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setsending(true)
    const { email, subject, message } = formData
    try{    const send = sendEmail(Admin,`${subject} Feed back from ${email}`,  message)
    const  res = await (await send).json()
    if (res.success) {
        setError(false)
        setsending(false)
        setAlert(true)
    }
    setFormData({
        email: "",
        subject:"",
        message: "",
      })
}catch{
        setError(true)
}finally{
        setTimeout(()=>{
                setsending(false)
                setAlert(false)
                setError(false)
        },5000)
}


  }

  return (
        
    <div id="contact" className=" flex flex-col-reverse md:flex md:flex-row mx-auto mt-5 p-4 mb-10 gap-[10%] border dark:border-white shadow-md  bg-gray-100 dark:bg-black/10 rounded-lg" >
       
        <Card className="  md:w-[50%] text-white  shadow-md border-none shadow-black/50">
      <CardHeader>
        <div className="flex mx-auto">
        <div className="flex"> { Alert?( <h1 className=" text-inline  font-semi-bold flex text-green-500"> Your message has been sent we will reply ASAP  <TiTick className=" mt-1 text-xl text-green-500"/> </h1>):( <div className=" flex text-2xl font-bold  text-black dark:text-white ">Leave Us a Feed Back</div>)} </div>
        <div className="flex"> { Error?( <h1 className=" text-inline font-semi-bold flex text-red-500"> Sorry an Error Occured   </h1>):(<h1></h1>)} </div>

        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6 ">

          <div className="space-y-2">
            
            <div className="grid grid-cols-2 gap-4">
              <div>
              <Label htmlFor="name" className="text-black dark:text-white">
              Email <span className="text-red-400">*</span>
            </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-black/10 border-black/60 text-black dark:text-white placeholder:text-black/50 dark:border-white dark:bg-white/50 dark:placeholder:text-black"
                />
          
              </div>
              <div>
              <Label htmlFor="name" className="text-black dark:text-white">
              Subject <span className="text-red-400">*</span>
            </Label>
                <Input
                  id="subject"
                  placeholder="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="bg-black/10 border-black/60 text-black dark:text-white placeholder:text-black/50 dark:border-white dark:bg-white/50 dark:placeholder:text-black "
                />
              
              </div>
            </div>
          </div>

          

          <div className="space-y-2">
            <Label htmlFor="message" className="text-black dark:text-white">
              Message <span className="text-red-400">*</span>
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              placeholder="Enter You Message Here"
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="bg-black/10 border-black/60 text-black dark:text-white placeholder:text-black/50 min-h-[150px] dark:border-white dark:bg-white/50 dark:placeholder:text-black"
            />
          </div>

          <Button type="submit" className="w-full bg-gold text-black dark:text-white hover:bg-yellow-500">
            {sending? ("Sending Message"):("Send Message")}
          </Button>
        </form>
      </CardContent>
    </Card>
     <div className="flex flex-col mt-2  justify-center items-center ">
                <h1 className="flex text-xl">
                        Let&apos;s Chat
                </h1>
                <div className="flex mt-5">
                        <h1 className="text-xl">
                                Leave a message we&apos;ll Respond ASAP
                        </h1>
                </div>
        </div>
    </div>
  )
}
export default FeedBack;