import { api } from "@/trpc/react";

export const useTeam = () => {
  const utils = api.useUtils();
  const { data: teams = [], isLoading } = api.team.get.useQuery();

  const { mutate, isPending } = api.team.create.useMutation({
    onSuccess: async () => {
      void utils.team.invalidate();
    },
  });

  return {
    teams,
    isLoading,
    create: mutate,
    isCreating: isPending,
  };
};
