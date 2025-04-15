"use client"
// import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import DataTable  from "@/components/data-table"
import { SectionCards } from "../../components/section-cards"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar"
import useGetProductsByOwner from "@/hooks/useGetProductsByOwner"
import { useUser } from "@clerk/nextjs"

const Profile=()=> {
        const user = useUser()
        console.log("User id is: ", user.user?.id ?? "No user ID available")
        const { data: products, } = useGetProductsByOwner(user.user?.id||'');
        console.log("Products are: ", products ?? "No Products")
        
  return (
    <SidebarProvider >
      {/* <AppSidebar variant="inset" /> */}
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable products={products ?? []} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
export default Profile
