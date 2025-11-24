"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPanel } from "./user-panel";
import { User } from "lucide-react";

export function UserButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label="User Panel"
      >
        <User className="h-5 w-5" />
      </Button>
      <UserPanel open={open} onOpenChange={setOpen} />
    </>
  );
}

