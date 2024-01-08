"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation"; // Use next/router instead of next/navigation
import { useSession } from "next-auth/react";

const ProfileCompletionCheck = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const path = usePathname();
  React.useEffect(() => {
    // Check if the user is signed in and needs profile completion
    if (session && session.user?.needsProfileCompletion) {
      // Redirect only if not already on the complete-profile page
      if (
        path !==
        `/User/${session.user.email}/completeProfile`
      ) {
        console.log("Redirecting to complete-profile");
        router.push(
          `/User/${session.user.email}/completeProfile`
        );
      }
    } else if (!session) {
      console.log("No session found. User not signed in.");
    }
  }, [session, router]);

  return null;
};

export default ProfileCompletionCheck;
