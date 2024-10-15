"use client";

import * as React from "react";
import { BsMoonStars } from "react-icons/bs";
import { BsSun } from "react-icons/bs";
import { useTheme } from "next-themes";

import { Button } from "../ui/button";

export default function ToggleMode() {
  const { theme, setTheme } = useTheme();
  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggle}>
      <BsSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <BsMoonStars className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
