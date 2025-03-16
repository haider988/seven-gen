"use client";
import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "../theme/theme-toggle";
import { Toaster } from "react-hot-toast";

const TopNav = () => {
  const { isSignedIn, user } = useUser();
  return (
    <nav className="flex justify-between items-center p-4 shadow gap-4 h-16">
      <Toaster />
      <Link href={"/"}> Seven GEN</Link>
      <div className="flex justify-center items-center">
        {isSignedIn ? (
          <Link
            href={"/dashboard"}
            className="mr-8"
          >{`${user.fullName}'s Dashboard`}</Link>
        ) : null}
        <SignedOut>
          <div className="mr-2">
            <SignInButton />
          </div>
          <div>
            <SignUpButton />
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <div className="ml-2">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
