import { z } from "zod";

import type { MemberWithRelations } from "./MemberSchema";
import { MemberWithRelationsSchema } from "./MemberSchema";
import type { UserWithRelations } from "./UserSchema";
import { UserWithRelationsSchema } from "./UserSchema";

/////////////////////////////////////////
// TEAM SCHEMA
/////////////////////////////////////////

export const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdById: z.string(),
});

export type Team = z.infer<typeof TeamSchema>;

/////////////////////////////////////////
// TEAM RELATION SCHEMA
/////////////////////////////////////////

export type TeamRelations = {
  createdBy: UserWithRelations;
  members: MemberWithRelations[];
};

export type TeamWithRelations = z.infer<typeof TeamSchema> & TeamRelations;

export const TeamWithRelationsSchema: z.ZodType<TeamWithRelations> =
  TeamSchema.merge(
    z.object({
      createdBy: z.lazy(() => UserWithRelationsSchema),
      members: z.lazy(() => MemberWithRelationsSchema).array(),
    }),
  );

export default TeamSchema;
