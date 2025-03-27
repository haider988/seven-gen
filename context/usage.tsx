"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usageCount } from "@/actions/ai";
import { useUser } from "@clerk/nextjs";

interface UsageContextType {
  count: number;
  fetchUsage: () => void;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsageContext = createContext<UsageContextType | null>(null);

export const UsageProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  //state
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  //hooks
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  const fetchUsage = async () => {
    try {
      const response = await usageCount(email);
      setCount(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (email) {
      fetchUsage();
    }
  }, [email]);

  useEffect(() => {
    if (count > 100) {
      setOpenModal(true);
    }
  }, [count]);
  return (
    <UsageContext.Provider
      value={{ count, fetchUsage, openModal, setOpenModal }}
    >
      {children}
    </UsageContext.Provider>
  );
};

export const useUsage = () => {
  const context = useContext(UsageContext);
  if (context === null) {
    throw new Error("useUsage must be used within UsageProvider");
  } else {
    return context;
  }
};
