import {
  fetchOwnersManagementList,
  ownersManagementListQueryKey,
} from "@client/services/owners";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { OwnersManagementTable } from "./management-table";

export async function OwnersRegisterTab() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ownersManagementListQueryKey,
    queryFn: fetchOwnersManagementList,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-4">
        <OwnersManagementTable />
      </div>
    </HydrationBoundary>
  );
}
