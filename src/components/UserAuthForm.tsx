"use client";
import React from "react";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { Icons } from "./Icons";
import { useToast } from "@/hooks/use-toast";
interface UserAuthFormProps {}

const UserAuthForm: FC<UserAuthFormProps> = ({}) => {
  const [isLoading, setIsLoading] =
    useState<boolean>(false);
  const { toast } = useToast();

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      //toast notification
      toast({
        title: "There was a problem.",
        description:
          "There was an error login in with google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={cn("flex justify-center")}>
      {/* <Button size="sm" className="w-full">
        Email and password
      </Button> */}
      <Button
        onClick={loginWithGoogle}
        isLoading={isLoading}
        size="sm"
        className="w-full"
      >
        {isLoading ? null : (
          <Icons.google className="h-4 w-4 mr-2" />
        )}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
