import { z } from "zod";

import UserSchema from "@/schemas/modelSchema/UserSchema";

export const userEntity = z.object(UserSchema.shape).extend({
  email: z.string().email().nullish(),
});
export type TUserEntity = z.infer<typeof userEntity>;
