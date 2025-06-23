import { Button } from "@client/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@client/components/ui/drawer";
import type { PropsWithChildren } from "react";
import { CreateServiceOrderForm } from "./form";

export function CreateServiceOrderAction({
  children = <Button size="sm">Novo Agendamento</Button>,
}: PropsWithChildren) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Adicionar novo Agendamento</DrawerTitle>
        </DrawerHeader>
        <CreateServiceOrderForm />
      </DrawerContent>
    </Drawer>
  );
}
