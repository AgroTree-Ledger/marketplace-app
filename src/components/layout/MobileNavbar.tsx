"use client";
import React, { PropsWithChildren, useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { MenuIcon } from "lucide-react";
import Logo from "./Logo";
import EndNavbarSection from "./EndNavbarSection";

const MobileNavbar: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div className="block border-separate bg-primary md:hidden">
      <nav className="container mx-auto flex items-center justify-between px-4">
        <div className="flex h-[64px] min-h-[60px] items-center gap-x-4">
          <Sheet open={isOpened} onOpenChange={setIsOpened}>
            <SheetTrigger asChild>
              <Button
                variant={"ghost"}
                type="button"
                onClick={() => setIsOpened(true)}
                className="-m-2.5 p-2.5 text-lightGrey lg:hidden"
              >
                <span className="sr-only">Open sidebar</span>
                <MenuIcon aria-hidden="true" className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]" side={"left"}>
              <SheetHeader>
                <SheetTitle asChild>
                  <Logo isMobile />
                </SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-1 pt-4">{children}</div>
            </SheetContent>
          </Sheet>
          <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
            <Logo isMobile />
          </div>
        </div>
        <EndNavbarSection hideThemeToogle />
      </nav>
    </div>
  );
};

export default MobileNavbar;
