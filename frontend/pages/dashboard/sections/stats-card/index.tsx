import { AppointmentsTodayCard } from "./appointments-today";
import { CanceledAppointmentsCard } from "./canceled-appointments";
import { RevenueCard } from "./revenue-card";

export function StatsCardSection() {
  return (
    <section className="grid grid-cols-1 gap-4 @xl/content:grid-cols-2 @5xl/content:grid-cols-4">
      <RevenueCard />
      <AppointmentsTodayCard />
      <CanceledAppointmentsCard />
      {/* <RatingsCard /> */}
    </section>
  );
}
