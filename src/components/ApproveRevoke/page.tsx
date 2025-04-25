"use client"
import type React from "react"
import useGetProductById from "@/hooks/useGetProductById"
import useApproveRevoke from "@/hooks/useApproveRevoke"
import { useSendMail } from "@/hooks/useSendMail"
import { useEffect, useState } from "react"
import useGetUserById from "@/hooks/useGetUserById"

interface ApproveRevokeModalProps {
        ischange: boolean
  onClose: () => void
  productId: string
  Action:boolean
}

const ApproveRevokeModal: React.FC<ApproveRevokeModalProps> = ({ ischange, onClose, productId,Action }) => {
  const {data:Product} = useGetProductById(productId)
  const {sendEmail}  = useSendMail()
  const Edit = useApproveRevoke()
  const[action, setaction] = useState("")
  const[message,setmessage] = useState("")
const userId = Product?.product_owner_id
// console.log("UserId  :",userId )
const { user } = useGetUserById(userId)
console.log("User :",user )
// console.log("email Address",user?.emailAddresses[0].emailAddress)
const UserEmail = user?.emailAddresses[0].emailAddress

useEffect(()=>{
        const HandleAction = () => {
                setaction(Action ? "Revoke" : "Approve");
        }
        HandleAction()
},[Action])
  const HandleEdit=async (id:string)=>{
        try{
        await Edit(id)
        onClose()
        //       Send notification emails
        }catch (error) {
                console.error(error)
                alert(error)
                return
        }
  }


  const HandleChange = async (e: React.FormEvent<HTMLFormElement | HTMLInputElement >,) => {
                    e.preventDefault();
                    setmessage(e.currentTarget.value)
                //     console.log("message",message)
                }
  const HandleSubmit=(id:string)=>{
        HandleEdit(id)
        sendEmail(`${UserEmail}`,`${action}d`,`${message}`)
        setmessage("")
  }

  if (!ischange) return null

  return (
    <div className="fade-in fixed z-40 inset-0 backdrop-blur-sm shadow-lg shadow-black rounded-lg flex  w-[100%] h-[100%]   overflow-auto overflow-x-hidden">
      <div className="  md:w-[60%] h-64 shadow-md shadow-black items-center justify-center my-auto mx-auto bg-gray-200 rounded-lg">
        <h1 className="text-2xl font-bold text-center text-black"><span className="text-dark text-xl ">Are you sure you want to</span> {action}  -<span className="text-gold" >&apos;{Product?.product_name}&apos;</span></h1>
        <div className="flex space-x-3 justify-center mt-10  py-10">
                <form onSubmit={()=>{HandleSubmit( Product?._id)}} className=" flex gap-2">
                <button
                type="submit"
                className=" w-48 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                {action} 
                </button>
                <input
                        type="text"
                        value={message}
                        placeholder="Enter Reason"
                        onChange={HandleChange}
                        required
                        className="flex"
                        />
                </form>
            
            <button
              type="button"
              className="w-48 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-400 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
      </div>
    </div>
  )
}

export default ApproveRevokeModal