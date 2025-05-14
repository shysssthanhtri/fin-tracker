"use client";

import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Routes } from "@/config/routes";
import type { TTeamEntity } from "@/entities/team.entity";

interface Props {
  teams: (TTeamEntity & { isFavorite: boolean })[];
}
export const TeamList = ({ teams }: Props) => {
  return (
    <ul className="max-h-44 space-y-4 overflow-y-auto">
      {teams.map((team) => (
        <li key={team.id}>
          <Link href={Routes.team.input(team.id)} className="w-full">
            <Button variant="outline" className="w-full">
              {team.name}
              {team.isFavorite && <Star className="text-yellow-400" />}
              <ArrowRight />
            </Button>
          </Link>
        </li>
      ))}
    </ul>
  );
};
