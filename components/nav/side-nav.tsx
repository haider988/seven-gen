"use client";
import React from "react";
import {
  LayoutDashboard,
  FileClock,
  WalletCards,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Usage from "./usage";
import SignUpModal from "../modal/sign-up-modal";

const menu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "History",
    icon: FileClock,
    path: "/dashboard/history",
  },
  {
    name: "Billing",
    icon: WalletCards,
    path: "/dashboard/billing",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
];
const SideNav = () => {
  const path = usePathname();
  return (
    <div className=" flex flex-col h-full">
      <ul className="flex-1 space-y-2">
        {menu.map((menuItem, index) => (
          <li
            className={`${
              path === menuItem.path
                ? "border-primary text-primary"
                : "hover:border-primary hover:text-primary"
            }  flex m-2 mr-2 p-2  rounded-lg border`}
            key={index}
          >
            <Link href={menuItem.path}>
              <div className="flex justify-center md:items-center md:justify-start w-full">
                <Link
                  href={menuItem.path}
                  className="flex w-full cursor-pointer"
                >
                  <menuItem.icon />{" "}
                  <span className="ml-3 md:ml-2 md:inline">
                    {menuItem.name}
                  </span>
                </Link>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="pb-20 mt-auto">
        <Usage />
        <SignUpModal />
      </div>
    </div>
  );
};

export default SideNav;
