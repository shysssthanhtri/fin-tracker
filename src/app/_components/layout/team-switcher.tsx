"use client";

import { ChevronsUpDown, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Query, Routes } from "@/config/routes";
import type { TTeamEntity } from "@/entities/team.entity";
import { api } from "@/trpc/react";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { data: teams = [], isLoading } = api.team.get.useQuery();
  const searchParams = useSearchParams();

  const activeTeamId = searchParams.get(Query.teamId);
  const activeTeam = teams?.find((team) => team.id === activeTeamId);

  const [isCreateTeamDialogOpen, setIsCreateTeamDialogOpen] =
    React.useState(false);

  const setActiveTeam = React.useCallback(
    (newActiveTeamId: TTeamEntity["id"]) => {
      router.push(Routes.input(newActiveTeamId));
    },
    [router],
  );

  if (!activeTeam && !isLoading) return null;

  const dropdown = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          disabled={isLoading}
        >
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {!!activeTeam && activeTeam.name}
              {!!isLoading && "Loading"}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="start"
        side={isMobile ? "bottom" : "right"}
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-muted-foreground text-xs">
          Teams
        </DropdownMenuLabel>
        {teams.map((team) => (
          <DropdownMenuItem
            key={team.name}
            onClick={() => setActiveTeam(team.id)}
            className="gap-2 p-2"
          >
            {team.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2 p-2"
          onClick={() => setIsCreateTeamDialogOpen(true)}
        >
          <div className="bg-background flex size-6 items-center justify-center rounded-md border">
            <Plus className="size-4" />
          </div>
          <div className="text-muted-foreground font-medium">Add team</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const dialogContent = (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. Are you sure you want to permanently
          delete this file from our servers?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button type="submit">Confirm</Button>
      </DialogFooter>
    </DialogContent>
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog
          open={isCreateTeamDialogOpen}
          onOpenChange={setIsCreateTeamDialogOpen}
        >
          {dropdown}
          {dialogContent}
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
