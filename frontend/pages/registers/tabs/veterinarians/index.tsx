import {
  fetchVeterinariansManagementList,
  veterinariansManagementListQueryKey,
} from "@client/services/veterinarians";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { VeterinariansManagementTable } from "./management-table";

export async function VeterinariansRegisterTab() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: veterinariansManagementListQueryKey,
    queryFn: fetchVeterinariansManagementList,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-4">
        <VeterinariansManagementTable />
      </div>
    </HydrationBoundary>
  );
}
