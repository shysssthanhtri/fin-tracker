import React from "react";

import { PageWrapper } from "@/app/_components/page-wrapper";
import { TeamsSection } from "@/app/(personal)/profile/_components/teams-section";
import { UserSection } from "@/app/(personal)/profile/_components/user-section";
import { api } from "@/trpc/server";

const ProfilePage = async () => {
  const teams = await api.team.getWithMember();
  return (
    <PageWrapper title="Profile">
      <div className="space-y-4">
        <UserSection />
        <TeamsSection
          teams={teams.map((team) => ({
            ...team,
            ...team.team,
          }))}
        />
      </div>
    </PageWrapper>
  );
};

export default ProfilePage;
