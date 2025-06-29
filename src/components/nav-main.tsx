"use client"

import {type LucideIcon } from "lucide-react"
import { IoAddCircle,IoBagCheckOutline  } from "react-icons/io5";
import {LayoutDashboardIcon,UserCircleIcon,Bookmark} from "lucide-react"
import { HomeIcon } from "lucide-react"
import { FcApproval  } from "react-icons/fc";
import { MdAlignHorizontalLeft,MdOutlinePending,  } from "react-icons/md";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";

export function NavMain() {
        const items = [
                {
                        title: "Home",
                        icon: HomeIcon as LucideIcon,
                        link:"/profile",
                },
                {
                        title: "All Products",
                        icon: MdAlignHorizontalLeft as LucideIcon,
                        link:"/profile/#all",
                },
                {
                        title: "Approved Products",
                        icon: FcApproval as LucideIcon,
                        link:"/profile/approved",
                },
                {
                        title: "Pending",
                        icon: MdOutlinePending as LucideIcon,
                        link:"/profile/pending",
                },
                {
                        title: "Orders",
                        icon: IoBagCheckOutline as LucideIcon,
                        link:"/profile/orders",
                },
                {
                        title: "Sell",
                        icon: IoAddCircle  as LucideIcon,
                        link:"/post",
                },
                 {
                        title: "Account",
                        icon: UserCircleIcon  as LucideIcon,
                        link:"/profile/account",
                },
                {
                        title: "Bookmarks",
                        icon: Bookmark  as LucideIcon,
                        link:"/profile/bookmarks",
                },

        ]
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2 mt-4">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Dashboard"
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
              <LayoutDashboardIcon />
              <span>Dashboard</span>
            </SidebarMenuButton>
          
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="font-semibold">
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="flex items-center gap-2">
              <Link href={item.link} className="w-full">
                <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
