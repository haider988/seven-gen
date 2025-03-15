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
    <div className="h-screen p-5 shadow-sm border">
      {menu.map((menuItem, index) => (
        <div
          className={`${
            path === menuItem.path
              ? "bg-primary text-white"
              : "hover:bg-primary hover:text-white"
          }  flex m-2 mr-2 p-2  rounded-lg cursor-pointer`}
          key={index}
        >
          <Link href={menuItem.path}>
            <div className="flex justify-center md:items-center md:justify-start w-full">
              <Link href={menuItem.path} className="flex">
                <menuItem.icon />{" "}
                <span className="ml-0 md:ml-2 hidden md:inline">
                  {menuItem.name}
                </span>
              </Link>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SideNav;
