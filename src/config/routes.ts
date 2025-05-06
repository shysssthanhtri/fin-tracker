import type { TTeamEntity } from "@/entities/team.entity";

export const Param = {
  teamId: "teamId",
} as const;

export const Routes = {
  auth: {
    signout: "/api/auth/signout",
    signin: "/api/auth/signin",
  },
  team: {
    input: (teamId: TTeamEntity["id"]) => `/${teamId}/`,
  },
  personal: {
    profile: "/profile",
    notification: "/notification",
  },
} as const;
