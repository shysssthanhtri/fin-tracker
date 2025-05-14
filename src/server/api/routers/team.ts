import { MemberRole } from "@prisma/client";

import { teamEntity } from "@/entities/team.entity";
import MemberSchema from "@/schemas/modelSchema/MemberSchema";
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
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  getWithMember: protectedProcedure.query(({ ctx }) => {
    return ctx.db.member.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        team: true,
      },
      orderBy: [
        {
          isFavorite: "desc",
        },
        {
          team: {
            createdAt: "desc",
          },
        },
      ],
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

  markFavoriteTeam: protectedProcedure
    .input(
      MemberSchema.pick({
        teamId: true,
        isFavorite: true,
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.member.update({
        where: {
          teamId_userId: {
            teamId: input.teamId,
            userId: ctx.session.user.id,
          },
        },
        data: {
          isFavorite: input.isFavorite,
        },
      });
    }),
});
