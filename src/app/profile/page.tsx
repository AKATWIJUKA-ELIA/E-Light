"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import PieChart  from "@/components/pie-chart"
import DataTable  from "@/components/data-table"
import { SectionCards } from "../../components/section-cards"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset,  } from "../../components/ui/sidebar"
import useGetProductsByOwner from "@/hooks/useGetProductsByOwner"
import { useAppSelector } from "@/hooks"
import { useState } from "react"
import useGetOrders from "@/hooks/usegetOrders"

const Profile=()=> {
        const User = useAppSelector((state)=>state.user.user)
        const { data: products, } = useGetProductsByOwner(User?.User_id||'');
        const { data: Orders } = useGetOrders();
        const approved = products?.filter((product) => product.approved).length || 0;
        const pending = products?.filter((product) => !product.approved).length || 0;
        const [isopen, setisOpen] = useState(true);   
        
  return (
    
      
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className=" flex flex-col md:flex-row @2xl:flex  gap-3 px-4 lg:px-6">
                <ChartAreaInteractive />
                <PieChart approved={approved} pending={pending} />
              </div>

              <div className="flex flex-col gap-4 px-4 lg:px-6">
                <div className=" px-4 " id="all" >
                <DataTable  products={products ?? [] } />
              </div>
              </div>
              
            </div>
          </div>
        </div>
      </SidebarInset>
  )
}
export default Profile
