import { MemberRole } from "@prisma/client";

import { teamEntity } from "@/entities/team.entity";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const teamRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) => {
    return ctx.db.team.findMany({
      where: {
        members: {
          some: {
            userId: ctx.session.user.id,
          },
        },
      },
    });
  }),

  create: protectedProcedure
    .input(
      teamEntity.pick({
        name: true,
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.team.create({
        data: {
          name: input.name,
          createdById: ctx.session.user.id,
          members: {
            create: {
              userId: ctx.session.user.id,
              role: MemberRole.EDITOR,
            },
          },
        },
      });
    }),
});
