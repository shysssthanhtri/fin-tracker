import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Routes } from "@/config/routes";
import { api } from "@/trpc/server";

export const TeamList = async () => {
  const teams = await api.team.get();
  return (
    <ul className="space-y-4">
      {teams.map((team) => (
        <li key={team.id}>
          <Link href={Routes.team.input(team.id)}>
            <Button variant="outline" className="w-full">
              {team.name}
              <ArrowRight />
            </Button>
          </Link>
        </li>
      ))}
    </ul>
  );
};
