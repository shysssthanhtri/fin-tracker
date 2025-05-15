"use server";

import type { TMemberTeamEntity } from "@/entities/team.entity";
import type { ActionResult } from "@/shared/types/action-type";
import { api } from "@/trpc/server";

export const saveTeams = async (
  teams: Pick<TMemberTeamEntity, "id" | "isFavorite">[],
): ActionResult<Awaited<ReturnType<typeof api.team.saveFavoriteTeams>>> => {
  try {
    const data = await api.team.saveFavoriteTeams(teams);
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error as Error,
    };
  }
};
