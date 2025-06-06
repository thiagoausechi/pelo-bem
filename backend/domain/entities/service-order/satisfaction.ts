import { err, ok, type Result } from "@core/result";
import { EmptyPropertyError } from "@server/domain/errors";
import type { Rating } from "./rating.enum";

interface SatisfactionProps {
  id?: string;
  serviceOrderId: string;
  rating: Rating;
  comment?: string;
}

export class Satisfaction {
  public static readonly ENTITY_NAME = "satisfação";

  public readonly id?: string;
  public readonly serviceOrderId: string;
  public readonly rating: Rating;
  public readonly comment?: string;

  private constructor(props: SatisfactionProps) {
    this.id = props.id;
    this.serviceOrderId = props.serviceOrderId;
    this.rating = props.rating;
    this.comment = props.comment;
  }

  public static create(
    props: SatisfactionProps,
  ): Result<Satisfaction, EmptyPropertyError> {
    const { id, serviceOrderId } = props;

    if (id !== undefined && id.length === 0)
      return err(new EmptyPropertyError("ID", Satisfaction.ENTITY_NAME));

    if (serviceOrderId.length === 0)
      return err(
        new EmptyPropertyError(
          "ID da Ordem de Serviço",
          Satisfaction.ENTITY_NAME,
        ),
      );

    return ok(new Satisfaction({ ...props }));
  }
}
