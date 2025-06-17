import { Button } from "@client/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@client/components/ui/drawer";
import {
  fetchOwnersDropdownList,
  ownersDropdownListQueryKey,
} from "@client/services/owners";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { CreatePetForm } from "./form";

export async function CreatePetAction({
  children = <Button size="sm">Novo Pet</Button>,
}: PropsWithChildren) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ownersDropdownListQueryKey,
    queryFn: fetchOwnersDropdownList,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Drawer>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="gap-1">
            <DrawerTitle>Adicionar novo Pet</DrawerTitle>
          </DrawerHeader>
          <CreatePetForm />
        </DrawerContent>
      </Drawer>
    </HydrationBoundary>
  );
}
