import { Separator } from "@/components/ui/separator"
import { useAppSelector } from "@/hooks"
// import { SidebarTrigger } from "@/components/ui/sidebar"
// import { useUser } from "@clerk/nextjs"

export function SiteHeader() {
        const user = useAppSelector((state)=>state.user.user) 
  return (
    <header className="md:mt-28 mt-40 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {/* <SidebarTrigger className="-ml-1" /> */}
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className=" text-2xl font-medium">Hello Admin <span className="text-pink-500  font-bold" > {user?.Username}</span>, Welcome to your dashboard</h1>
      </div>
    </header>
  )
}
