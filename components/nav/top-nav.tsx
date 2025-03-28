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
import { useUsage } from "@/context/usage";

const TopNav = () => {
  const { isSignedIn, user } = useUser();
  const { subscribed } = useUsage();
  console.log("subss>>", subscribed);
  return (
    <nav className="flex justify-between items-center p-4 shadow gap-4 h-16">
      <Toaster />
      <Link href={"/"}> Seven GEN</Link>
      <Link href={"/gen-ai"}>Gen-AI</Link>
      {!subscribed && (
        <Link href={"/membership"}>🔥Join free or $9.99/month</Link>
      )}
      <div className="flex justify-center items-center">
        {isSignedIn ? (
          <Link
            href={"/dashboard"}
            className="mr-8"
          >{`${user.fullName}'s Dashboard`}</Link>
        ) : null}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="mr-4 text-slate-800 dark:text-white rounded cursor-pointer">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="text-slate-800 dark:text-white rounded cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <div className="ml-2 ">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
