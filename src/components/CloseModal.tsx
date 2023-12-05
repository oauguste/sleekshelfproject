"use client";
import { FC } from "react";
import React from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
interface CloseModalProps {}

const CloseModal: FC<CloseModalProps> = ({}) => {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => router.back()}
        aria-label="close modal"
        variant="ghost"
        className="h-6 w-6 p-0 rounded-md"
      >
        <X className="h-4 w-4"></X>
      </Button>
    </div>
  );
};

export default CloseModal;
