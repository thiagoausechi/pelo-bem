import {
  ServicesDoneSection,
  StatsCardSection,
  UpcomingServicesSection,
} from "./sections";

export function DashboardPage() {
  return (
    <div className="relative isolate flex flex-1 flex-col">
      <div className="@container/content container mx-auto flex flex-1 flex-col gap-2 px-4">
        <div className="flex flex-col gap-4 py-4 md:gap-11 md:py-6">
          <StatsCardSection />

          <UpcomingServicesSection />

          <ServicesDoneSection />
        </div>
      </div>
    </div>
  );
}
