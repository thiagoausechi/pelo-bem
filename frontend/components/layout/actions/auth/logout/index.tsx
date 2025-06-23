"use client";

import { Button } from "@client/components/ui/button";
import { useLogoutLogic } from "./logic";

export function LogoutAction() {
  const { logout, isPending } = useLogoutLogic();

  return (
    <Button disabled={isPending} onClick={() => logout()}>
      Sair
    </Button>
  );
}
