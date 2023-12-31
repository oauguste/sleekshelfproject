// layouts/HybridLayout.layout.tsx

"use server";
import React from "react";
import { getAuthSession } from "@/lib/auth";
import ProfileCompletionCheck from "@/components/ProfileCompletionCheck";
import { SessionContext } from "@/lib/SessionContext";

interface HybridLayoutProps {
  children: React.ReactNode;
}

const HybridLayout: React.FC<HybridLayoutProps> = async ({
  children,
}) => {
  const session = await getAuthSession();

  return (
    <SessionContext.Provider value={{ session }}>
      <ProfileCompletionCheck />
      {/* No session prop needed */}
      {children}
    </SessionContext.Provider>
  );
};

export default HybridLayout;
