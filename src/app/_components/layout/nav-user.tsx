"use client";

import {
  BellIcon,
  LogOutIcon,
  MoreVerticalIcon,
  UserCircleIcon,
} from "lucide-react";
import React from "react";

import { LinkWithIcon } from "@/components/link-with-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Routes } from "@/config/routes";

interface Props {
  user?: {
    name: string;
    image: string;
    email: string;
  };
}
export const NavUser = ({ user }: Props) => {
  const userBlock = (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage
          src={user?.image ?? undefined}
          alt={user?.name ?? undefined}
        />
        <AvatarFallback className="rounded-lg">N/A</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user?.name}</span>
        <span className="text-muted-foreground truncate text-xs">
          {user?.email}
        </span>
      </div>
    </>
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {userBlock}
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side="right"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {userBlock}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LinkWithIcon href={Routes.setting.account}>
                  <UserCircleIcon />
                  Account
                </LinkWithIcon>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LinkWithIcon href={Routes.notification}>
                  <BellIcon />
                  Notifications
                </LinkWithIcon>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LinkWithIcon href={Routes.auth.signout}>
                <LogOutIcon />
                Log out
              </LinkWithIcon>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
