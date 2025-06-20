import { Button } from "@client/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@client/components/ui/drawer";
import type { PropsWithChildren } from "react";
import { CreateVeterinarianForm } from "./form";

export function CreateVeterinarianAction({
  children = <Button size="sm">Novo Veterinário</Button>,
}: PropsWithChildren) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Adicionar novo Veterinário</DrawerTitle>
        </DrawerHeader>
        <CreateVeterinarianForm />
      </DrawerContent>
    </Drawer>
  );
}
