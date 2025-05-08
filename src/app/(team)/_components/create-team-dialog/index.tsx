"use client";

import type { DialogProps } from "@radix-ui/react-dialog";
import React from "react";

import { TeamForm } from "@/app/(team)/_components/forms/team-form";
import { ButtonLoading } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = React.ComponentProps<React.FC<DialogProps>>;

export const CreateTeamDialog = (props: Props) => {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new team</DialogTitle>
          <DialogDescription>
            You can also add another users to your team.
          </DialogDescription>
        </DialogHeader>
        <TeamForm />
        <DialogFooter>
          <ButtonLoading type="submit">Create</ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
