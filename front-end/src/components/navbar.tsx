"use client";
import * as React from "react";
import ToggleMode from "./Navbar-components/ToggleMode";

const Navbar = () => {
  return (
    <div className="h-14 shadow-none border-b-2 backdrop-blur-sm backdrop-opacity-0 justify-between flex items-center">
      <div></div>
      <div>
        <ToggleMode />
      </div>
    </div>
  );
};

export default Navbar;
