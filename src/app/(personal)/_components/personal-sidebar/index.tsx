import React from "react";

import { NavUser } from "@/app/_components/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { auth } from "@/server/auth";

export const PersonalSidebar = async (
  props: React.ComponentProps<typeof Sidebar>,
) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return null;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader />
      <SidebarContent />
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
    </Sidebar>
  );
};
