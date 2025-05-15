"use client";

import type { MemberRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";

import { saveTeams } from "@/app/(personal)/profile/_actions/save-teams";
import {
  TeamTable,
  type TeamTableRef,
} from "@/app/(personal)/profile/_components/teams-section/team-table";
import { Button, ButtonLoading } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TMemberTeamEntity, TTeamEntity } from "@/entities/team.entity";

interface Props {
  teams: (TTeamEntity & {
    role: MemberRole;
    isFavorite: boolean;
  })[];
}
export const TeamsSection = ({ teams }: Props) => {
  const [isTeamsChanged, setIsTeamsChanged] = useState(false);
  const ref = React.useRef<TeamTableRef>(null);
  const [isSaving, startSaving] = useTransition();
  const router = useRouter();

  const onSave = (teams: TMemberTeamEntity[]) => {
    startSaving(async () => {
      await saveTeams(teams);
      router.refresh();
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Teams</CardTitle>
      </CardHeader>
      <CardContent>
        <TeamTable teams={teams} onChange={setIsTeamsChanged} ref={ref} />
      </CardContent>
      {isTeamsChanged && (
        <CardFooter className="flex justify-end gap-x-4">
          <Button
            variant="outline"
            onClick={() => ref.current?.reset()}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <ButtonLoading
            onClick={() => onSave(ref.current?.getTeams() ?? [])}
            isLoading={isSaving}
          >
            Save
          </ButtonLoading>
        </CardFooter>
      )}
    </Card>
  );
};
