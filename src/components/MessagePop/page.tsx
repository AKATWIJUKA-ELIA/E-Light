"use client"
import type React from "react"
import { useNotification } from "@/app/NotificationContext"
import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";

interface MessagePopProps {
  isvisible: boolean
  onClose: () => void
  message: string
  status: string
}

const MessagePop: React.FC= () => {
        const { notification, setNotification } = useNotification()
        const isvisible = notification !== null
        const message = notification?.message || ""
        const status = notification?.status || ""
        
        const onClose = () => {
        setNotification(null)
        }
const handleclose =()=>{
        onClose()
}
useEffect(() => {
        setTimeout(() => {
                onClose()
        }, 5000); 
}, [message]);

 const notificationColor =(() => {
        switch (status) {
            case "success":
                return "bg-green-100 text-green-800";
            case "error":
                return "bg-red-100 text-red-800";
            case "info":
                return "bg-blue-100 text-blue-800";
            case "warning":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
 })

  if (!isvisible) return null

  return (
    <div className={` fixed z-40 top-2 right-2 mt-[8%] rounded-lg flex  w-[35%] h-[5%]   overflow-auto overflow-x-hidden ${notificationColor()}`}>
      <div className={`items-center justify-center my-auto mx-auto  ${notificationColor()} rounded-lg`}>
      <h1 className="text-2xl  text-center">{status}: {message} </h1>
      </div>
      <button onClick={handleclose} className="absolute top-1 right-2 bg-black/60 p-1 rounded-md hover:text-gray-700">
        <IoMdClose size={24} fill="red" />
      </button>
    </div>
  )
}

export default MessagePop
