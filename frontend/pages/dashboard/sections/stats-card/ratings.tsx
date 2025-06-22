import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@client/components/ui/card";
import { Placeholder, Skeleton } from "@client/components/ui/skeleton";
import { StarRating } from "@client/components/ui/star-rating";
import { Star } from "lucide-react";
import React from "react";

export function RatingsCard() {
  // TODO: Carregar dados da API

  return (
    <Card className="@container/card justify-between gap-0">
      <CardHeader>
        <CardDescription className="text-center">
          Satisfação Geral
        </CardDescription>
        <CardTitle className="col-span-2 flex flex-col items-center text-3xl font-semibold tabular-nums @[250px]/card:text-3xl">
          <Skeleton
            data={null as number | null /* ex.: 4.2 */}
            placeholder={<Placeholder className="h-14 w-full" />}
          >
            {(rating) => (
              <React.Fragment>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold">{rating}</p>
                  <span className="text-muted-foreground text-sm">/5</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <StarRating rating={rating} size="sm" />
                </div>
              </React.Fragment>
            )}
          </Skeleton>
        </CardTitle>
        <CardAction>
          <Star className="text-muted-foreground h-4 w-4" />
        </CardAction>
      </CardHeader>

      <CardFooter className="text-muted-foreground text-sm">
        <Skeleton
          data={"Não Implementado" /* ex.: 1000 */}
          placeholder={<Placeholder className="h-5 flex-1" />}
        >
          {(totalRatingsCount) => (
            <p className="grow text-center">
              {totalRatingsCount} {/*avaliações*/}
            </p>
          )}
        </Skeleton>
      </CardFooter>
    </Card>
  );
}
