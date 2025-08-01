"use client"
import { ChartAreaInteractive } from "@/adminComponents/chart-area-interactive"
import PieChart  from "@/sudoComponents/pie-chart"
import DataTable  from "@/sudoComponents/data-table"
import { SectionCards } from "../../sudoComponents/section-cards"
import { SiteHeader } from "../../sudoComponents/site-header"
import { SidebarInset,  } from "../../sudoComponents/ui/sidebar"
import useGetAllProducts from "@/hooks/useGetAllProducts";
import useGetAllOrders from "@/hooks/useGetAllOrders";

const Profile=()=> {
        const { data: products, } = useGetAllProducts() ;
        const { data: orders } = useGetAllOrders();
        
        
  return (
    
      
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col mt-5 ">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className=" flex flex-col md:flex-row @2xl:flex  gap-3 p-4 lg:px-6 ">
                <ChartAreaInteractive />
                <PieChart products={products?.length||0} orders={orders?.length||0} />
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
