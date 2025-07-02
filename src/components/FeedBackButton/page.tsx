"use client"

import * as React from "react"
import { MdFeedback } from "react-icons/md";
import FeedBack from "@/components/FeedBack/page";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from "react";

const FeedBackButton=()=> {
        const [feedBack, setshowfeedBack] = useState(false);
        const onClose = () => {
                setshowfeedBack(false);
        }

  return (
    <>
    <div className="fixed bottom-20 right-7 z-50" >
       
        <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
          <MdFeedback className="border rounded-md  bg-gray-100 dark:bg-black dark:fill-white " fill="black" size="32" onClick={() => setshowfeedBack(true)} />

        </TooltipTrigger>

    <TooltipContent>
      <p>Send us feedBack</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
    </div>
    {feedBack && <FeedBack onClose={onClose} />}
    </>
  )
}
export default FeedBackButton;