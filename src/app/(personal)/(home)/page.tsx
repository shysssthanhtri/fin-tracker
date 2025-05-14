import React from "react";

import { CreateTeamButton } from "@/app/(personal)/(home)/_components/create-team-button";
import { TeamList } from "@/app/(personal)/(home)/_components/team-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/server";

const PersonalPage = async () => {
  const teams = await api.team.get();

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Choose your team to start to input</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <TeamList teams={teams} />
          <CreateTeamButton />
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalPage;
