import {
  fetchPetsManagementList,
  petsManagementListQueryKey,
} from "@client/services/pets";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { PetsManagementTable } from "./management-table";

export async function PetsRegisterTab() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: petsManagementListQueryKey,
    queryFn: fetchPetsManagementList,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-4">
        <PetsManagementTable />
      </div>
    </HydrationBoundary>
  );
}
