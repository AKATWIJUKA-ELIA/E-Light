import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import { Badge } from "../components/ui/badge"
import useGetProductsByOwner from "@/hooks/useGetProductsByOwner"
// import { useUser } from "@clerk/nextjs"
import '../app/globals.css'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAppSelector } from "@/hooks"

export function SectionCards() {
        // const user = useUser()
        const User = useAppSelector((state)=>state.user.user)
         const { data: products, } = useGetProductsByOwner(User?.User_id||'');
  return (
    <div className=" *:data-[slot=card]:shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <Card className="@container/card bg-blue-100 transition-transform duration-200 hover:border-pink-400 hover:cursor-pointer hover:scale-105 dark:text-black  dark:bg-gray-500 ">
        <CardHeader className="relative">
          <CardDescription className="text-black">Total Products</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {products?.length} Products
          </CardTitle>
         
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card bg-pink-100 transition-transform duration-200 hover:border-blue-400 hover:cursor-pointer hover:scale-105 dark:text-black dark:bg-gray-500 ">
        <CardHeader className="relative">
          <CardDescription>Approved</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {products?.filter((product) => product.approved).length || 0} Products
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingDownIcon className="size-3" />
              -20%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <TrendingDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card bg-blue-100 transition-transform duration-200 hover:border-pink-400 hover:cursor-pointer hover:scale-105 dark:text-black dark:bg-gray-500 ">
        <CardHeader className="relative">
          <CardDescription>Pending</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {products?.filter((product) => !product.approved).length || 0} Products
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
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
