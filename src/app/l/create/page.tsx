"use client";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { CreateListSchema } from "@/app/lists/route";

const Page = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [istemplate, setIsTemplate] = useState(false);
  // const [id, setId] = useState(0);
  // const [userId, setUserId] = useState(0);
  // const [date, setDate] = useState("");

  const { mutate: createList, isPending } = useMutation({
    mutationFn: async () => {
      const payload = { title, description }; // Only send title and description
      const { data } = await axios.post("/lists", payload);
      return data as string;
    },
    onSuccess: () => {
      // Handle success (e.g., redirecting to a confirmation page or displaying a success message)
      console.log("List created");
    },
    onError: () => {
      // Handle error
      console.log("List not created");
    },
  });

  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Create a list
          </h1>
        </div>
        <hr className=" bg-zinc-500 h-px" />
        <div>
          <p className="text-lg font-medium ">name</p>
          <p className=" text-xs pb-2">
            List names cannot be changed
          </p>
          <div className=" relative">
            <Input
              placeholder="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* <Input
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            /> */}
          </div>
          <div className=" relative mt-2">
            <Input
              type="text"
              placeholder="description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />
          </div>
        </div>
        <div className=" flex justify-end gap-4">
          <Button
            variant="ghost"
            onClick={(e) => router.back()}
          >
            cancel
          </Button>
          <Button
            isLoading={isPending}
            disabled={title.length === 0}
            onClick={() => createList()}
          >
            Create List
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
