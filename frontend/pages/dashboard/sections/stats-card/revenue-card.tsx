import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@client/components/ui/card";
import { Placeholder, Skeleton } from "@client/components/ui/skeleton";
import { TrendingUp } from "lucide-react";

export function RevenueCard() {
  // TODO: Carregar dados da API

  return (
    <Card className="@container/card text-center">
      <CardHeader>
        <CardDescription>
          <p>Faturamento do Mês</p>
        </CardDescription>
        <CardTitle className="col-span-2 text-3xl font-semibold @[250px]/card:text-3xl">
          <Skeleton
            data={null /* ex.: RS 1.000,00 */}
            placeholder={<Placeholder className="h-9" />}
          >
            {(revenue) => <p className="tabular-nums">{revenue}</p>}
          </Skeleton>
        </CardTitle>
        <CardAction>
          <TrendingUp className="text-muted-foreground h-4 w-4" />
        </CardAction>
      </CardHeader>
      <CardFooter className="text-muted-foreground flex flex-1 grow text-sm">
        <Skeleton
          data={"Não Implementado" /* ex.: +20.1% do mês passado */}
          placeholder={<Placeholder className="h-5 flex-1" />}
        >
          {(statistics) => <p className="grow text-center">{statistics}</p>}
        </Skeleton>
      </CardFooter>
    </Card>
  );
}
