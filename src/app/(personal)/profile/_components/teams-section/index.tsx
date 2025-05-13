"use client";

import React from "react";

import { TeamTable } from "@/app/(personal)/profile/_components/teams-section/team-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";

export const TeamsSection = () => {
  const { data: teams = [] } = api.team.getWithMember.useQuery();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Teams</CardTitle>
      </CardHeader>
      <CardContent>
        <TeamTable
          teams={teams.map((team) => ({
            ...team,
            ...team.team,
          }))}
        />
      </CardContent>
    </Card>
  );
};
