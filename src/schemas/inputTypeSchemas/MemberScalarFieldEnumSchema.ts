import { z } from "zod";

export const MemberScalarFieldEnumSchema = z.enum(["teamId", "userId", "role"]);

export default MemberScalarFieldEnumSchema;
