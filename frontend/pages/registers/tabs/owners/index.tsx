import type { OwnerDTO } from "@core/contracts/dtos/owners";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export async function OwnersRegisterTab() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["list-owners"],
    queryFn: async () => [] as OwnerDTO[],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-4">
        {/* <OwnersManagementTable /> */}
      </div>
    </HydrationBoundary>
  );
}
