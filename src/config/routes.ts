import type { TTeamEntity } from "@/entities/team.entity";

export const Query = {
  teamId: "team-id",
} as const;

export const Routes = {
  auth: {
    signout: "/api/auth/signout",
    signin: "/api/auth/signin",
  },
  setting: {
    setting: "/setting",
    account: "/account",
  },
  input: (teamId: TTeamEntity["id"]) => `/?${Query.teamId}=${teamId}`,
  notification: "/notification",
} as const;
