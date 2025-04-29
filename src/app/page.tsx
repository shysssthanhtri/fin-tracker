import { redirect } from "next/navigation";
import React from "react";

import { Routes } from "@/config/routes";
import { api } from "@/trpc/server";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ "team-id"?: string } | undefined>;
}) => {
  const teams = await api.team.get();
  if (!teams.length) {
    const team = await api.team.create({ name: "Personal" });
    redirect(Routes.input(team.id));
  }

  const selectedTeamId = (await searchParams)?.["team-id"];
  if (!selectedTeamId || !teams.find((team) => team.id === selectedTeamId)) {
    redirect(Routes.input(teams[0]?.id ?? ""));
  }

  return <div>Home</div>;
};

export default Home;
