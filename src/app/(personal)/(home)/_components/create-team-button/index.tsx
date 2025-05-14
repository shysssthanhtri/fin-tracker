"use client";

import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { CreateTeamDialog } from "@/app/(team)/_components/create-team-dialog";
import { useTeam } from "@/app/(team)/_hooks/use-team";
import { Button } from "@/components/ui/button";

export const CreateTeamButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { create, isCreating } = useTeam();
  const router = useRouter();

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)} className="w-full">
        Or create new team
        <PlusCircle />
      </Button>
      <CreateTeamDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        createTeam={(team) =>
          create(team, {
            onSuccess: (createdTeam) => {
              setIsDialogOpen(false);
              router.push(createdTeam.id);
            },
          })
        }
        isLoading={isCreating}
      />
    </>
  );
};
