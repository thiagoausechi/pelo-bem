import { err, ok, type Result } from "@core/result";
import {
  EmptyPropertyError,
  NegativePropertyError,
} from "@server/domain/errors";

interface ServiceTypeProps {
  id?: string;
  name: string;
  description: string;
  price: number;
}

export class ServiceType {
  public static readonly ENTITY_NAME = "tipo de serviço";

  public readonly id?: string;
  public readonly name: string;
  public readonly description: string;
  public readonly price: number;

  private constructor(props: ServiceTypeProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
  }

  public static create(
    props: ServiceTypeProps,
  ): Result<ServiceType, EmptyPropertyError | NegativePropertyError> {
    const { id, name, description, price } = props;

    if (id !== undefined && id.length === 0)
      return err(new EmptyPropertyError("ID", ServiceType.ENTITY_NAME));

    if (name.length === 0)
      return err(new EmptyPropertyError("Nome", ServiceType.ENTITY_NAME));

    if (description.length === 0)
      return err(new EmptyPropertyError("Descrição", ServiceType.ENTITY_NAME));

    if (price <= 0)
      return err(new NegativePropertyError("Preço", ServiceType.ENTITY_NAME));

    return ok(new ServiceType({ ...props }));
  }
}
