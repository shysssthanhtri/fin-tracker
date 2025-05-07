import { PlusCircle } from "lucide-react";
import React from "react";

import { TeamList } from "@/app/(personal)/(home)/_components/team-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PersonalPage = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Choose your team to start input</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <TeamList />
          <Button className="w-full">
            Or create new team
            <PlusCircle />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalPage;
