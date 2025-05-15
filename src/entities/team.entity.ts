import { z } from "zod";

import MemberSchema from "@/schemas/modelSchema/MemberSchema";
import TeamSchema from "@/schemas/modelSchema/TeamSchema";

export const teamEntity = z.object(TeamSchema.shape).extend({
  name: z.string().min(3).max(50),
});
export type TTeamEntity = z.infer<typeof teamEntity>;

export const memberTeamEntity = teamEntity.extend({
  role: MemberSchema.shape.role,
  isFavorite: MemberSchema.shape.isFavorite,
});
export type TMemberTeamEntity = z.infer<typeof memberTeamEntity>;
