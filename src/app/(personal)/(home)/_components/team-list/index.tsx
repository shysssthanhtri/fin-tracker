"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import { ButtonLoading } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Routes } from "@/config/routes";
import type { TTeamEntity } from "@/entities/team.entity";
import { cn } from "@/lib/utils";

interface Props {
  teams: TTeamEntity[];
  selectedTeamId?: TTeamEntity["id"];
  onSelectTeamId: (teamId: TTeamEntity["id"]) => void;
  isLoading: boolean;
}
export const TeamList = ({
  onSelectTeamId,
  selectedTeamId,
  teams,
  isLoading,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <ButtonLoading
          variant="outline"
          className="w-full text-left"
          isLoading={isLoading}
        >
          {teams.find((t) => t.id === selectedTeamId)?.name ?? "Select team..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </ButtonLoading>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search team..." />
          <CommandList>
            <CommandEmpty>No team found.</CommandEmpty>
            <CommandGroup>
              {teams.map((team) => (
                <Link key={team.id} href={Routes.team.input(team.id)}>
                  <CommandItem
                    key={team.id}
                    value={team.name}
                    onSelect={() => {
                      onSelectTeamId(team.id);
                      setIsOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedTeamId === team.id
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {team.name}
                  </CommandItem>
                </Link>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
