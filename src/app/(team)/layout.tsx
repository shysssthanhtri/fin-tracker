import React from "react";

import { TeamsSidebar } from "@/app/(team)/_components/teams-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const TeamsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarProvider>
      <TeamsSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default TeamsLayout;
