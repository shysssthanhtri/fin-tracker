import { z } from "zod";

import { MemberRoleSchema } from "../inputTypeSchemas/MemberRoleSchema";
import type { TeamWithRelations } from "./TeamSchema";
import { TeamWithRelationsSchema } from "./TeamSchema";
import type { UserWithRelations } from "./UserSchema";
import { UserWithRelationsSchema } from "./UserSchema";

/////////////////////////////////////////
// MEMBER SCHEMA
/////////////////////////////////////////

export const MemberSchema = z.object({
  role: MemberRoleSchema,
  teamId: z.string(),
  userId: z.string(),
  isFavorite: z.boolean(),
});

export type Member = z.infer<typeof MemberSchema>;

/////////////////////////////////////////
// MEMBER RELATION SCHEMA
/////////////////////////////////////////

export type MemberRelations = {
  team: TeamWithRelations;
  user: UserWithRelations;
};

export type MemberWithRelations = z.infer<typeof MemberSchema> &
  MemberRelations;

export const MemberWithRelationsSchema: z.ZodType<MemberWithRelations> =
  MemberSchema.merge(
    z.object({
      team: z.lazy(() => TeamWithRelationsSchema),
      user: z.lazy(() => UserWithRelationsSchema),
    }),
  );

export default MemberSchema;
