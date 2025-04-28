import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

export const LinkWithIcon = (props: React.ComponentProps<typeof Link>) => {
  return (
    <Link
      {...props}
      className={cn("flex w-full items-center gap-2", props.className)}
    />
  );
};
