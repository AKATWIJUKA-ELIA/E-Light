"use client"

import {type LucideIcon } from "lucide-react"
import { IoBagCheckOutline  } from "react-icons/io5";
import {LayoutDashboardIcon,HomeIcon,CreditCard,SquarePlus,Rows4,Users,HandCoins,SquareStack,Newspaper,User        } from "lucide-react"

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
                        link:"/admin",
                },
                
              
                {
                        title: "Orders",
                        icon: IoBagCheckOutline as LucideIcon,
                        link:"/admin/orders",
                },
             
                 {
                        title: "Add to Menu",
                        icon: SquarePlus   as LucideIcon,
                        link:"/admin/add-menu-item",
                },
                {
                        title: "Add categories",
                        icon: SquareStack    as LucideIcon,
                        link:"/admin/add-category",
                },
                {
                        title: "Menu Items",
                        icon: Rows4    as LucideIcon,
                        link:"/admin/menu-items",
                },
                {
                        title: "Transactions",
                        icon: CreditCard   as LucideIcon,
                        link:"/admin/payment-methods",
                },
                {
                        title: "Customers",
                        icon: Users     as LucideIcon,
                        link:"/admin/customers",
                },
                {
                        title: "Offers",
                        icon: HandCoins     as LucideIcon,
                        link:"/admin/offers",
                },
                {
                        title: "NewsLetter",
                        icon: Newspaper      as LucideIcon,
                        link:"/admin/newsletter",
                },
                {
                        title: "Add User",
                        icon: User      as LucideIcon,
                        link:"/admin/add-user",
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
        <SidebarMenu className="font-semibold gap-4">
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="flex items-center gap-2">
              <Link href={item.link} className="w-full ">
                <SidebarMenuButton tooltip={item.title} className="gap-3" >
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
