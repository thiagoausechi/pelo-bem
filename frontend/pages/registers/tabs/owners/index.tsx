import type { OwnerDTO } from "@core/contracts/dtos/owners";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { OwnersManagementTable } from "./management-table";
import { queryKey } from "./management-table/config";

export async function OwnersRegisterTab() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queryKey],
    queryFn: async () => [] as OwnerDTO[],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-4">
        <OwnersManagementTable />
      </div>
    </HydrationBoundary>
  );
}
