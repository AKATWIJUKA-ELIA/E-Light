"use client"

import * as React from "react"
import { MdFeedback } from "react-icons/md";
import FeedBack from "@/components/FeedBack/page";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";

const FeedBackButton=()=> {
        const [feedBack, setshowfeedBack] = useState(false);
        const onClose = () => {
                setshowfeedBack(false);
        }

  return (
    <>
    <div className="fixed bottom-20 right-6 z-50" >
        <DropdownMenu  >
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MdFeedback />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setshowfeedBack(true)}>
          Send Us FeedBack
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
    {feedBack && <FeedBack onClose={onClose} />}
    </>
  )
}
export default FeedBackButton;