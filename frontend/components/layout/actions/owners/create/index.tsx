import { Button } from "@client/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@client/components/ui/drawer";
import type { PropsWithChildren } from "react";
import { ManagementOwnerForm } from "../management-form";
import { useCreateOwnerLogic } from "./logic";

export function CreateOwnerAction({
  children = <Button size="sm">Novo Cuidador</Button>,
}: PropsWithChildren) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Adicionar novo Cuidador</DrawerTitle>
        </DrawerHeader>
        <ManagementOwnerForm
          sendButtonLabel="Cadastrar"
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          useLogic={useCreateOwnerLogic as any}
        />
      </DrawerContent>
    </Drawer>
  );
}
