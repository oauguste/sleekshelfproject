// pages/complete-profile.tsx
"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { useSessionContext } from "@/lib/SessionContext";
import {
  createUser,
  updateUserEmail,
} from "@/repositories/userRepository";

const CompleteProfile = () => {
  const [profileData, setProfileData] = useState<any>({}); // Define the type according to your user model
  const { session } = useSessionContext();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const email = session?.user?.email || ""; // From session
  const premiumStatus = "free" as "free" | "paid"; // Default status

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newUser = {
      username,
      email,
      premium_status: premiumStatus,

      created_at: new Date().toISOString(),
      passwordHash: "",
    };
    try {
      await createUser(newUser);
      // Redirect or handle response
      router.push("/profile"); // Example redirect
    } catch (error) {
      console.error("Failed to create user:", error);
      // Handle error
    }

    if (session?.user?.email) {
      await updateUserEmail(session.user.email, {
        username,
      });
      router.push("/some-redirect-path");
    }
  };

  if (!session?.user?.needsProfileCompletion) {
    router.push("/");
    return null;
  }

  return (
    <div>
      <h1>Complete Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />
        {/* Display email but don't allow editing */}
        <p>Email: {email}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CompleteProfile;
