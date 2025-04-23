"use client"
import type React from "react"
import useGetProductById from "@/hooks/useGetProductById"
import useApproveRevoke from "@/hooks/useApproveRevoke"
import { useEffect, useState } from "react"


interface ApproveRevokeModalProps {
        ischange: boolean
  onClose: () => void
  productId: string
  Action:boolean
}

const ApproveRevokeModal: React.FC<ApproveRevokeModalProps> = ({ ischange, onClose, productId,Action }) => {
  const {data:Product} = useGetProductById(productId)
  const Edit = useApproveRevoke()
  const[action, setaction] = useState("")

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
                alert(error)
                return
        }

  }

  if (!ischange) return null

  return (
    <div className="fade-in fixed z-40 inset-0 backdrop-blur-sm shadow-lg shadow-black rounded-lg flex  w-[100%] h-[100%]   overflow-auto overflow-x-hidden">
      <div className="  md:w-[60%] h-64 shadow-md shadow-black items-center justify-center my-auto mx-auto bg-gray-200 rounded-lg">
        <h1 className="text-2xl font-bold text-center text-black">{action}  -<span className="text-gold" >&apos;{Product?.product_name}&apos;</span></h1>
        <div className="flex space-x-3 justify-center mt-10  py-10">
            <button
              type="submit"
              onClick={()=>{HandleEdit(Product?._id)}}
              className=" w-48 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {action} 
            </button>
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