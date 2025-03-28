"use client";
import React from "react";
import { createCustomerPortalSession } from "@/actions/stripe";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function Billing() {
  const handleClick = async () => {
    const res = await createCustomerPortalSession();

    if (res.error) {
      toast.error(res.error); // Show an alert or some UI message
    } else {
      window.location.href = res.url!; // Redirect to Stripe portal
    }
  };

  return (
    <div>
      <div className="p-10 my-5 mx-5 mb-5 rounded-lg bg-slate-200 dark:bg-slate-800 flex flex-col justify-center items-center">
        <h1 className="text-xl">Billing</h1>
        <p>Manage your subscription plan</p>
      </div>

      <div className="p-5">
        <Button className="cursor-pointer" onClick={handleClick}>
          Access Stripe Customer Portal
        </Button>
      </div>
    </div>
  );
}
