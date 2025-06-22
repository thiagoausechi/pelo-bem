import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@client/components/ui/card";
import { Placeholder, Skeleton } from "@client/components/ui/skeleton";
import { CalendarOff } from "lucide-react";

export function CanceledAppointmentsCard() {
  // TODO: Carregar dados da API

  return (
    <Card className="@container/card text-center">
      <CardHeader>
        <CardDescription>Agendamentos Cancelados</CardDescription>
        <CardTitle className="col-span-2 text-3xl font-semibold tabular-nums @[250px]/card:text-3xl">
          <Skeleton
            data={null /* ex.: 10 */}
            placeholder={<Placeholder className="h-9" />}
          >
            {(canceledAppointments) => (
              <p className="tabular-nums">{canceledAppointments}</p>
            )}
          </Skeleton>
        </CardTitle>
        <CardAction>
          <CalendarOff className="text-muted-foreground h-4 w-4" />
        </CardAction>
      </CardHeader>
      <CardFooter className="text-muted-foreground text-sm">
        {/* <p className="grow text-center">Pacientes cancelados este mês</p> */}
        <p className="grow text-center">Não Implementado</p>
      </CardFooter>
    </Card>
  );
}
