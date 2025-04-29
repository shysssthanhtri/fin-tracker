import { z } from "zod";

export const MemberRoleSchema = z.enum(["VIEWER", "EDITOR"]);

export type MemberRoleType = `${z.infer<typeof MemberRoleSchema>}`;

export default MemberRoleSchema;
