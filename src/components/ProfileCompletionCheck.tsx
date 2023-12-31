// ProfileCompletionCheck.client.tsx

"use client";
import React from "react";
import { useRouter } from "next/router";
import { useSessionContext } from "@/lib/SessionContext";

const ProfileCompletionCheck = () => {
  const { session } = useSessionContext();
  const router = useRouter();

  React.useEffect(() => {
    if (session?.user?.needsProfileCompletion) {
      router.push("/complete-profile");
    }
  }, [session, router]);

  return null;
};

export default ProfileCompletionCheck;
