"use client";
import * as React from "react";
import ToggleMode from "./Navbar-components/ToggleMode";
import LocalSwitcher from "./Navbar-components/local-switcher";

export default function Navbar() {
  return (
    <div className="h-14 backdrop-blur-sm backdrop-opacity-0 justify-between flex items-center">
      <div></div>
      <div className="flex items-center">
        <LocalSwitcher/>
        <ToggleMode />
      </div>
    </div>
  );
}
