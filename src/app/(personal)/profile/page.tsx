import React from "react";

import { TeamsSection } from "@/app/(personal)/profile/_components/teams-section";
import { UserSection } from "@/app/(personal)/profile/_components/user-section";

const ProfilePage = () => {
  return (
    <div className="space-y-4">
      <UserSection />
      <TeamsSection />
    </div>
  );
};

export default ProfilePage;
