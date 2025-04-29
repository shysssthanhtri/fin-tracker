import React from "react";

import { NavMain } from "@/app/_components/layout/nav-main";
import { NavUser } from "@/app/_components/layout/nav-user";
import { TeamSwitcher } from "@/app/_components/layout/team-switcher";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { auth } from "@/server/auth";

export const Sidebar = async (
  props: React.ComponentProps<typeof ShadcnSidebar>,
) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return null;

  return (
    <ShadcnSidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            email: user.email ?? "",
            image: user.image ?? "",
            name: user.name ?? "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </ShadcnSidebar>
  );
};
