"use client";

import { BarChart2, type LucideIcon, Pencil, Settings } from "lucide-react";
import React from "react";

import { LinkWithIcon } from "@/components/link-with-icon";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  sidebarMenuButtonVariants,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export const NavMain = () => {
  const navItems: NavItem[] = [
    {
      icon: Pencil,
      title: "Input",
      url: "/",
    },
    {
      icon: BarChart2,
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      icon: Settings,
      title: "Setting",
      url: "/setting",
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton>
                <LinkWithIcon
                  href={item.url}
                  className={sidebarMenuButtonVariants({
                    variant: "default",
                    size: "default",
                  })}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </LinkWithIcon>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

type NavItem = {
  icon: LucideIcon;
  title: string;
  url: string;
};
