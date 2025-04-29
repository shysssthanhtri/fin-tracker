import React from "react";

import { Sidebar } from "@/app/_components/layout/sidebar";
import { SiteHeader } from "@/app/_components/layout/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface Props {
  children: React.ReactNode;
}
export const Layout = async ({ children }: Props) => {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};
