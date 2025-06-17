import type { Rating } from "@core/contracts/enums/service-orders";
import { err, ok, type Result } from "@core/result";
import { EmptyPropertyError } from "@server/domain/errors";
import { BaseEntity, type BaseEntityProps } from "../base";

interface SatisfactionProps extends BaseEntityProps {
  serviceOrderId: string;
  rating: Rating;
  comment?: string;
}

export class Satisfaction extends BaseEntity {
  public static readonly ENTITY_NAME = "satisfação";

  public readonly serviceOrderId: string;
  public readonly rating: Rating;
  public readonly comment?: string;

  private constructor(props: SatisfactionProps) {
    super(Satisfaction.ENTITY_NAME, props);

    this.serviceOrderId = props.serviceOrderId;
    this.rating = props.rating;
    this.comment = props.comment;
  }

  public static create(
    props: SatisfactionProps,
  ): Result<Satisfaction, EmptyPropertyError> {
    const { serviceOrderId } = props;

    if (serviceOrderId.length === 0)
      return err(
        new EmptyPropertyError(
          "ID da Ordem de Serviço",
          Satisfaction.ENTITY_NAME,
        ),
      );

    const satisfaction = new Satisfaction(props);
    return satisfaction.validate() ?? ok(satisfaction);
  }
}
