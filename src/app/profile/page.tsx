"use client"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset,  } from "../../components/ui/sidebar"
import { useAppSelector } from "@/hooks"
import AccountManagement from "@/components/UserProfile/Profile"

const Profile=()=> {
        const User = useAppSelector((state)=>state.user.user)
        
        
  return (
    
      
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="  p-5 mx-10 rounded-2xl bg-gray-300 dark:bg-gray-800" >
                <AccountManagement />
                </div>
              
            </div>
          </div>
        </div>
      </SidebarInset>
  )
}
export default Profile
