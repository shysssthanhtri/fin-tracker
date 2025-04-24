import { z } from "zod";

import type { AccountWithRelations } from "./AccountSchema";
import { AccountWithRelationsSchema } from "./AccountSchema";
import type { PostWithRelations } from "./PostSchema";
import { PostWithRelationsSchema } from "./PostSchema";
import type { SessionWithRelations } from "./SessionSchema";
import { SessionWithRelationsSchema } from "./SessionSchema";

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// USER RELATION SCHEMA
/////////////////////////////////////////

export type UserRelations = {
  accounts: AccountWithRelations[];
  sessions: SessionWithRelations[];
  posts: PostWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations;

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> =
  UserSchema.merge(
    z.object({
      accounts: z.lazy(() => AccountWithRelationsSchema).array(),
      sessions: z.lazy(() => SessionWithRelationsSchema).array(),
      posts: z.lazy(() => PostWithRelationsSchema).array(),
    }),
  );

export default UserSchema;
