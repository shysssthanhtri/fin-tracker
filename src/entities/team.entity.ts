import { z } from "zod";

import TeamSchema from "@/schemas/modelSchema/TeamSchema";

export const teamEntity = z.object(TeamSchema.shape).extend({
  name: z.string().min(3).max(50),
});
export type TTeamEntity = z.infer<typeof teamEntity>;
