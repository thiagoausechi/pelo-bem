import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@client/components/ui/card";
import { Placeholder, Skeleton } from "@client/components/ui/skeleton";
import { CalendarHeart } from "lucide-react";

export function AppointmentsTodayCard() {
  // TODO: Carregar dados da API

  return (
    <Card className="@container/card text-center">
      <CardHeader>
        <CardDescription>Agenda do Dia</CardDescription>
        <CardTitle className="col-span-2 text-3xl font-semibold tabular-nums @[250px]/card:text-3xl">
          <Skeleton
            data={null /* ex.: 10 */}
            placeholder={<Placeholder className="h-9" />}
          >
            {(appointmentsToday) => (
              <p className="tabular-nums">{appointmentsToday}</p>
            )}
          </Skeleton>
        </CardTitle>
        <CardAction>
          <CalendarHeart className="text-muted-foreground h-4 w-4" />
        </CardAction>
      </CardHeader>
      <CardFooter className="text-muted-foreground text-sm">
        {/* <p className="grow text-center">Pacientes a serem atendidos hoje</p> */}
        <p className="grow text-center">Não Implementado</p>
      </CardFooter>
    </Card>
  );
}
