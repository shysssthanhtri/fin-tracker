"use client";

import { PlusCircle } from "lucide-react";
import React, { useState } from "react";

import { TeamList } from "@/app/(personal)/(home)/_components/team-list";
import { CreateTeamDialog } from "@/app/(team)/_components/create-team-dialog";
import { useTeam } from "@/app/(team)/_hooks/use-team";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PersonalPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { create, isCreating } = useTeam();

  return (
    <>
      <div className="flex h-full items-center justify-center">
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Choose your team to start input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TeamList />
            <Button className="w-full" onClick={() => setIsDialogOpen(true)}>
              Or create new team
              <PlusCircle />
            </Button>
          </CardContent>
        </Card>
      </div>
      <CreateTeamDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        createTeam={create}
        isLoading={isCreating}
      />
    </>
  );
};

export default PersonalPage;
