"use client";
import Link from "next/link";
import React from "react";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/button";
import { useSession } from "next-auth/react";
import UserAccountNav from "./UserAccountNav";
import { SessionProvider } from "next-auth/react";
import ProfileCompletionCheck from "./ProfileCompletionCheck";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <SessionProvider>
      <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
        <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
          {/* logo */}
          <Link
            href="/"
            className="flex gap-2 items-center"
          >
            <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
            <p className="hidden text-zinc-700 text-sm font-medium md:block">
              Sleek Shelf
            </p>
          </Link>
          {/* searchbar */}

          {/* sign-in */}

          {session?.user ? (
            <UserAccountNav
              user={session.user}
              id={session.user.email as string}
            />
          ) : (
            <Link
              href="/sign-in"
              className={buttonVariants()}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </SessionProvider>
  );
};

export default Navbar;
