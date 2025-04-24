import { z } from "zod";

import type { UserWithRelations } from "./UserSchema";
import { UserWithRelationsSchema } from "./UserSchema";

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullish(),
  access_token: z.string().nullish(),
  expires_at: z.number().nullish(),
  token_type: z.string().nullish(),
  scope: z.string().nullish(),
  id_token: z.string().nullish(),
  session_state: z.string().nullish(),
  refresh_token_expires_in: z.number().nullish(),
});

export type Account = z.infer<typeof AccountSchema>;

/////////////////////////////////////////
// ACCOUNT RELATION SCHEMA
/////////////////////////////////////////

export type AccountRelations = {
  user: UserWithRelations;
};

export type AccountWithRelations = z.infer<typeof AccountSchema> &
  AccountRelations;

export const AccountWithRelationsSchema: z.ZodType<AccountWithRelations> =
  AccountSchema.merge(
    z.object({
      user: z.lazy(() => UserWithRelationsSchema),
    }),
  );

export default AccountSchema;
