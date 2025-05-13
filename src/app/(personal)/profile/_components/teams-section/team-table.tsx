import type { MemberRole } from "@prisma/client";
import React from "react";

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

interface Props {
  teams: (TTeamEntity & {
    roles: MemberRole[];
  })[];
}
export const TeamTable = ({ teams }: Props) => {
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
            <TableCell>{team.roles.join()}</TableCell>
            <TableCell>Checked</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
