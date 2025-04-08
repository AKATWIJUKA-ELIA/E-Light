import {SignIn} from "@clerk/nextjs"

import React from 'react'

const Signin = () => {
  return (
    <div className="flex justify-center" >
        <SignIn />
    </div>
  )
}

export default Signin