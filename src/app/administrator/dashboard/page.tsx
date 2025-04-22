"use client"
// import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/admin-chart-area-interactive"
import DataTable  from "@/components/admin-data-table"
import SectionCards  from "../../../components/admin-section-cards"
import { SiteHeader } from "../../../components/admin-site-header"
import { SidebarInset, SidebarProvider } from "../../../components/ui/sidebar"
// import useGetProductsByOwner from "@/hooks/useGetProductsByOwner"
import useGetAllProducts from "@/hooks/useGetAllProducts"
// import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
interface Product {
        _id:string,
  approved: boolean,
  product_cartegory: string,
  product_condition: string,
  product_description: string,
  product_image: string,
  product_name: string,
  product_owner_id: string,
  product_price: string,
  _creationTime:Date
      }
      type products = Product[]

      
const Profile=()=> {

        // const User = useUser()
        const { data: Allproducts, } = useGetAllProducts() 
        const [Products, setProducts] = useState<products>([])
        const [ApprovedProducts, setApprovedProducts] = useState<products>([])
        const [PendingProducts, setPendingProducts] = useState<products>([])
        const [currentcard,setcurrentcard] = useState("")
        // console.log("Products are: ", products ?? "No Products")
        useEffect(()=>{
                setProducts(Allproducts ? Allproducts : [])

        },[Allproducts])

        useEffect(()=>{
                const HanldeFilter=()=>{
                        const filteredapproved = [] as any[]
                        const filteredpending = [] as any[]
                        Allproducts?.map((product)=>product.approved
                        ?filteredapproved.push(product):filteredpending.push(product) )
                        setApprovedProducts(filteredapproved)
                        setPendingProducts(filteredpending)
                        console.log("Approved Products:",filteredpending)
                }
                HanldeFilter()
        },[Allproducts])

        useEffect(()=>{
                if (currentcard === "approved") {
                        setProducts(ApprovedProducts);
                      } else if (currentcard === "pending") {
                        setProducts(PendingProducts);
                      } else {
                        setProducts(Allproducts ? Allproducts : []);
                      }
        },[currentcard, ApprovedProducts, PendingProducts, Allproducts])
        console.log("CurrentCard is :",currentcard)
        
  return (
    <SidebarProvider >
      {/* <AppSidebar variant="inset" /> */}
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards ClickedCard={(value)=>setcurrentcard(value)} />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <div className="border-2 rounded-lg">
                <DataTable  products={Products ?? [] } />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
export default Profile
