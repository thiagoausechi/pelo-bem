import { Button } from "@client/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@client/components/ui/drawer";
import type { PropsWithChildren } from "react";
import { CreatePetForm } from "./form";

export function CreatePetAction({
  children = <Button size="sm">Novo Pet</Button>,
}: PropsWithChildren) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Adicionar novo Pet</DrawerTitle>
        </DrawerHeader>
        <CreatePetForm />
      </DrawerContent>
    </Drawer>
  );
}
