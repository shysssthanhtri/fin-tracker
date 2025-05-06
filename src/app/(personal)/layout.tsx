import React from "react";

import { PersonalSidebar } from "@/app/(personal)/_components/personal-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const PersonalLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarProvider>
      <PersonalSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default PersonalLayout;
