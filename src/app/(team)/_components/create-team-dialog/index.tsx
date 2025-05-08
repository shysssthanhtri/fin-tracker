"use client";

import type { DialogProps } from "@radix-ui/react-dialog";
import React from "react";

import {
  TeamForm,
  type TeamFormRef,
  type TeamFormSchema,
} from "@/app/(team)/_forms/team-form";
import { ButtonLoading } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props extends React.ComponentProps<React.FC<DialogProps>> {
  createTeam?: (team: TeamFormSchema) => void;
  isLoading?: boolean;
}

export const CreateTeamDialog = ({
  createTeam,
  isLoading,
  ...props
}: Props) => {
  const ref = React.useRef<TeamFormRef>(null);
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new team</DialogTitle>
          <DialogDescription>
            You can also add another users to your team.
          </DialogDescription>
        </DialogHeader>
        <TeamForm ref={ref} onSubmit={createTeam} />
        <DialogFooter>
          <ButtonLoading
            type="submit"
            onClick={() => {
              ref.current?.submit();
            }}
            isLoading={isLoading}
          >
            Create
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
