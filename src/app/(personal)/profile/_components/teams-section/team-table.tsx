"use client";

import type { MemberRole } from "@prisma/client";
import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TTeamEntity } from "@/entities/team.entity";
import { api } from "@/trpc/react";

interface Props {
  teams: (TTeamEntity & {
    role: MemberRole;
    isFavorite: boolean;
  })[];
}
export const TeamTable = ({ teams }: Props) => {
  const utils = api.useUtils();
  const { mutate, isPending } = api.team.markFavoriteTeam.useMutation({
    onSuccess: async () => {
      await utils.team.getWithMember.invalidate();
    },
  });

  return (
    <Table>
      <TableCaption>Your joint teams.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Roles</TableHead>
          <TableHead>Marked</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teams.map((team) => (
          <TableRow key={team.id}>
            <TableCell>{team.name}</TableCell>
            <TableCell>{team.role}</TableCell>
            <TableCell>
              <Checkbox
                checked={team.isFavorite}
                onCheckedChange={() => {
                  mutate({ teamId: team.id, isFavorite: !team.isFavorite });
                }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
