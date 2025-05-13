import React from "react";

import { UserInfoForm } from "@/app/(personal)/profile/_components/forms/user-info-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/server/auth";

export const UserSection = async () => {
  const session = await auth();
  return (
    <Card>
      <CardHeader>
        <CardTitle>User info</CardTitle>
      </CardHeader>
      <CardContent>
        {!!session && <UserInfoForm value={session.user} disabled />}
      </CardContent>
    </Card>
  );
};
