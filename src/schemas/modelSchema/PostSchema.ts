import { z } from "zod";

import type { UserWithRelations } from "./UserSchema";
import { UserWithRelationsSchema } from "./UserSchema";

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdById: z.string(),
});

export type Post = z.infer<typeof PostSchema>;

/////////////////////////////////////////
// POST RELATION SCHEMA
/////////////////////////////////////////

export type PostRelations = {
  createdBy: UserWithRelations;
};

export type PostWithRelations = z.infer<typeof PostSchema> & PostRelations;

export const PostWithRelationsSchema: z.ZodType<PostWithRelations> =
  PostSchema.merge(
    z.object({
      createdBy: z.lazy(() => UserWithRelationsSchema),
    }),
  );

export default PostSchema;
