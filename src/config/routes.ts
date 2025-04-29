import type { TTeamEntity } from "@/entities/team.entity";

export const Routes = {
  auth: {
    signout: "/api/auth/signout",
    signin: "/api/auth/signin",
  },
  setting: {
    setting: "/setting",
    account: "/account",
  },
  input: (teamId: TTeamEntity["id"]) => `/?team-id=${teamId}`,
  notification: "/notification",
} as const;
