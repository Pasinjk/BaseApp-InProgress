"use client";

import * as React from "react";
import { BsTranslate } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/routing";

export default function LocalSwitcher() {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const localActive = useLocale();
  const onSelectChange = (e: string) => {
    const nextLocale = e;
    startTransition(() => {
      router.replace(`/${nextLocale}/${pathname}`);
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <BsTranslate className="size-6/12"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=""align="center" defaultValue={localActive}>
        <DropdownMenuItem onSelect={() => onSelectChange("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onSelectChange("th")}>
          ไทย
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
