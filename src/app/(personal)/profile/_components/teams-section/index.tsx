import React from "react";

import { TeamTable } from "@/app/(personal)/profile/_components/teams-section/team-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/server";

export const TeamsSection = async () => {
  const teams = await api.team.get();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Teams</CardTitle>
      </CardHeader>
      <CardContent>
        <TeamTable
          teams={teams.map((team) => ({
            ...team,
            roles: team.members.map((member) => member.role),
          }))}
        />
      </CardContent>
    </Card>
  );
};
