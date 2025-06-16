import { Button } from "@client/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@client/components/ui/drawer";

export function CreateOwnerAction() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="sm">Novo Cuidador</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Adicionar novo Cuidador</DrawerTitle>
        </DrawerHeader>
        {/* <CreateOwnerForm /> */}
      </DrawerContent>
    </Drawer>
  );
}
