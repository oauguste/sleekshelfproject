"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";

const CompleteProfile = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const email = session?.user?.email || "";
  const name = session?.user?.name || "";
  const password_hash = "together";

  const { mutate: completeProfile, isPending } =
    useMutation({
      mutationFn: async () => {
        const payload = {
          username,
          email,
          premium_status: "free", // Assuming this is a default value
          created_at: new Date().toISOString(),
          password_hash, // This needs to be handled appropriately
        };
        const { data } = await axios.post(
          "/users", // Adjusted endpoint
          payload
        );

        return data;
      },
      onSuccess: async () => {
        console.log("Profile completed");
        await update({ needsProfileCompletion: false });
        router.push("/");
      },
      onError: () => {
        console.log("Failed to complete profile");
      },
    });

  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Complete Your Profile
          </h1>
        </div>
        <hr className="bg-zinc-500 h-px" />
        <div>
          <p className="text-lg font-medium">Username</p>
          <div className="relative mt-2">
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <p className="text-lg font-medium mt-4">Email</p>
          <p className="text-sm">{email}</p>
          <p className="text-lg font-medium mt-4">Name</p>
          <p className="text-sm">{name}</p>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            isLoading={isPending}
            disabled={username.length === 0}
            onClick={() => completeProfile()}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
