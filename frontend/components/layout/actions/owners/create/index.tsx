import { Button } from "@client/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@client/components/ui/drawer";
import type { PropsWithChildren } from "react";
import { CreateOwnerForm } from "./form";

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
        <CreateOwnerForm />
      </DrawerContent>
    </Drawer>
  );
}
