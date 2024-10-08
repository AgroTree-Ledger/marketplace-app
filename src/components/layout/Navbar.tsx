import React from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import NavbarItem from "./NavbarItem";
import { NAVBAR_ITEMS } from "@/lib/constants";

const Navbar = () => {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar>
        {NAVBAR_ITEMS.map((item) => (
          <NavbarItem key={item.label} item={item} />
        ))}
      </MobileNavbar>
    </>
  );
};

export default Navbar;
