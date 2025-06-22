import { Button } from "@client/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@client/components/ui/drawer";
import type { OwnerDTO } from "@core/contracts/dtos/owners";
import type { PropsWithChildren } from "react";
import { ManagementOwnerForm } from "../management-form";
import { useUpdateOwnerLogic } from "./logic";

interface Props {
  loadedOwnerData: OwnerDTO;
}

export function UpdateOwnerAction({
  children = <Button size="sm">Atualizar Cuidador</Button>,
  loadedOwnerData,
}: PropsWithChildren<Props>) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Atualizar Cuidador</DrawerTitle>
        </DrawerHeader>
        <ManagementOwnerForm
          sendButtonLabel="Atualizar"
          loadedData={loadedOwnerData}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          useLogic={useUpdateOwnerLogic as any}
        />
      </DrawerContent>
    </Drawer>
  );
}
