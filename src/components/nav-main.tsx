"use client"

import { MailIcon, PlusCircleIcon, type LucideIcon } from "lucide-react"
import {LayoutDashboardIcon} from "lucide-react"
import { HomeIcon } from "lucide-react"
import { FcApproval,FcCancel  } from "react-icons/fc";
import { MdAlignHorizontalLeft,MdOutlinePending  } from "react-icons/md";

import { Button } from "@/components/ui/button"
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
                        link:"/",
                },
                {
                        title: "All Products",
                        icon: MdAlignHorizontalLeft as LucideIcon,
                        link:"#all",
                },
                {
                        title: "Approved Products",
                        icon: FcApproval as LucideIcon,
                        link:"/",
                },
                {
                        title: "Pending",
                        icon: MdOutlinePending as LucideIcon,
                        link:"/",
                },
                {
                        title: "Failed",
                        icon: FcCancel as LucideIcon,
                        link:"/",
                }
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
