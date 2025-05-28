import React from "react";

import { SiteHeader } from "@/app/_components/site-header";

interface Props {
  children: React.ReactNode;
  title: string;
}
export const PageWrapper = ({ children, title }: Props) => {
  return (
    <>
      <SiteHeader title={title} />
      <div className="p-4">{children}</div>
    </>
  );
};
