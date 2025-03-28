import React from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import SideNav from "@/components/nav/side-nav";

export default function MobileNav() {
  return (
    <div>
      <div className="px-4 mb-2 bg-slate-50 dark:bg-slate-900">
        <Sheet>
          <SheetTrigger>
            <button className="p-2">
              <Menu size={30} />
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[300px]">
            {/* ✅ Add SheetTitle for accessibility */}
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SideNav />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
