"use client";

import clone from "clone-deep";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

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
import type { TMemberTeamEntity, TTeamEntity } from "@/entities/team.entity";

interface Props {
  teams: TMemberTeamEntity[];
  onChange: (isChanged: boolean) => void;
}
export type TeamTableRef = {
  reset: () => void;
  getTeams: () => TMemberTeamEntity[];
};
export const TeamTable = forwardRef<TeamTableRef, Props>(
  ({ teams: originalTeams, onChange }, ref) => {
    const [teams, setTeams] = useState(clone(originalTeams));
    const isChanged = useMemo(() => {
      return JSON.stringify(teams) !== JSON.stringify(originalTeams);
    }, [originalTeams, teams]);

    const onToggleFavorite = useCallback(
      (teamId: TTeamEntity["id"]) => {
        const newTeams = teams.slice();
        newTeams.forEach((t) => {
          if (t.id === teamId) {
            t.isFavorite = !t.isFavorite;
          }
        });
        setTeams(newTeams);
      },
      [teams],
    );

    useEffect(() => {
      onChange(isChanged);
    }, [isChanged, onChange]);

    const reset = useCallback(() => {
      setTeams(clone(originalTeams));
    }, [originalTeams]);

    useImperativeHandle(
      ref,
      () => ({
        reset: () => {
          reset();
        },
        getTeams: () => teams,
      }),
      [reset, teams],
    );

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
                  onCheckedChange={() => onToggleFavorite(team.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
);

TeamTable.displayName = "TeamTable";
