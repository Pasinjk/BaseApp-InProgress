"use client";
import * as React from "react";
import ToggleMode from "./Navbar-components/ToggleMode";
import LocalSwitcher from "./Navbar-components/local-switcher";

export default function Navbar() {
  return (
    <div className="sticky top-0 h-16 backdrop-blur-sm border-b backdrop-opacity-0 shadow-sm  justify-between flex items-center">
      <div></div>
      <div className="flex items-center">
        <LocalSwitcher/>
        <ToggleMode />
      </div>
    </div>
  );
}
