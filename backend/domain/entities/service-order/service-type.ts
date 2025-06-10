import { err, ok, type Result } from "@core/result";
import {
  EmptyPropertyError,
  NegativePropertyError,
} from "@server/domain/errors";
import { BaseEntity, type BaseEntityProps } from "../base";

interface ServiceTypeProps extends BaseEntityProps {
  name: string;
  description: string;
  price: number;
}

export class ServiceType extends BaseEntity {
  public static readonly ENTITY_NAME = "tipo de serviço";

  public readonly name: string;
  public readonly description: string;
  public readonly price: number;

  private constructor(props: ServiceTypeProps) {
    super(ServiceType.ENTITY_NAME, props);

    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
  }

  public static create(
    props: ServiceTypeProps,
  ): Result<ServiceType, EmptyPropertyError | NegativePropertyError> {
    const { name, description, price } = props;

    if (name.length === 0)
      return err(new EmptyPropertyError("Nome", ServiceType.ENTITY_NAME));

    if (description.length === 0)
      return err(new EmptyPropertyError("Descrição", ServiceType.ENTITY_NAME));

    if (price <= 0)
      return err(new NegativePropertyError("Preço", ServiceType.ENTITY_NAME));

    const serviceType = new ServiceType(props);
    return serviceType.validate() ?? ok(serviceType);
  }
}
