"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";

import { useTeam } from "@/app/(team)/_hooks/use-team";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Routes } from "@/config/routes";

export const TeamList = () => {
  const { teams, isLoading } = useTeam();

  const skeletons = useMemo(
    () => (
      <>
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i}>
            <Skeleton className="h-8 w-full" />
          </li>
        ))}
      </>
    ),
    [],
  );

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
      {!teams.length && !isLoading && (
        <li className="text-center text-gray-500 italic">Empty</li>
      )}
      {isLoading && skeletons}
    </ul>
  );
};
