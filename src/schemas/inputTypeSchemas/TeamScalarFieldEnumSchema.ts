import { z } from "zod";

export const TeamScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "createdAt",
  "updatedAt",
  "createdById",
]);

export default TeamScalarFieldEnumSchema;
