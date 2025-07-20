import useGetAllProducts from "@/hooks/useGetAllProducts"
import useGetSellersOrders from "@/hooks/useGetSellersOrders"
import '../app/globals.css'
import {
  Card,
  CardDescription,
//   CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import { useAppSelector } from "@/hooks"

export function SectionCards() {
        // const User = useAppSelector((state)=>state.user.user)
         const { data: products, } = useGetAllProducts();
        const { data: orders } = useGetSellersOrders();
  return (
    <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 px-4  lg:px-6">
      <Card className="@container/card bg-blue-100 transition-transform duration-200 hover:border-pink-400 hover:cursor-pointer hover:scale-105 dark:text-black  dark:bg-gray-500 ">
        <CardHeader className="relative p-12">
          <CardDescription className="text-black t">Total Products</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {products?.length} Products
          </CardTitle>
         
        </CardHeader>
        
      </Card>

      <Card className="@container/card bg-pink-100 transition-transform duration-200 hover:border-blue-400 hover:cursor-pointer hover:scale-105 dark:text-black dark:bg-gray-500 ">
        <CardHeader className="relative p-12">
          <CardDescription>Total Orders OverTime</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {orders?.length || 0} Orders
          </CardTitle>
          
        </CardHeader>
        
      </Card>

      <Card className="@container/card bg-blue-100 transition-transform duration-200 hover:border-pink-400 hover:cursor-pointer hover:scale-105 dark:text-black dark:bg-gray-500 ">
        <CardHeader className="relative p-12">
          <CardDescription>Active Orders</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {orders?.filter((order) => order.order_status ==="pending").length || 0} Pending Orders
          </CardTitle>
          
        </CardHeader>
    
      </Card>

      {/* <Card className="@container/card bg-pink-100 transition-transform duration-200 hover:border-blue-400 hover:cursor-pointer hover:scale-105 dark:text-black dark:bg-gray-500 ">
        <CardHeader className="relative">
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +4.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card> */}
    </div>
  )
}
