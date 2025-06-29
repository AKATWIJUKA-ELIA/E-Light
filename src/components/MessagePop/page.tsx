"use client"
import type React from "react"

interface MessagePopProps {
  isvisible: boolean
  onClose: () => void
  message: string
  status: string
}

const MessagePop: React.FC<MessagePopProps> = ({ isvisible, onClose, message,status }) => {

const handleclose =()=>{
        onClose()
}


  if (!isvisible) return null

  return (
    <div className=" absolute top-10 mt-[3%] rounded-lg flex  w-[50%] h-[50%]   overflow-auto overflow-x-hidden">
      <div className="my-auto  md:w-[60%] items-center justify-center mx-auto bg-gray-200 dark:bg-dark rounded-lg">
      <h1 className="text-2xl font-bold text-center text-black dark:text-white ">{status}: {message}</h1>
      </div>
    </div>
  )
}

export default MessagePop
