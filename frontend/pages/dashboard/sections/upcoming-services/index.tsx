import {
  fetchUpcomingServicesList,
  upcomingServicesListQueryKey,
} from "@client/services/service-orders";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { UpcomingServicesTable } from "./management-table";

export async function UpcomingServicesSection() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: upcomingServicesListQueryKey,
    queryFn: fetchUpcomingServicesList,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex flex-col gap-4">
        <UpcomingServicesTable />
      </section>
    </HydrationBoundary>
  );
}
