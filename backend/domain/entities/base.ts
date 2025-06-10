import { err } from "@core/result";
import { EmptyPropertyError } from "../errors";

export interface BaseEntityProps {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class BaseEntity {
  private readonly entityName: string;

  public readonly id?: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  protected constructor(entityName: string, props: BaseEntityProps) {
    this.entityName = entityName;
    this.id = props.id;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  protected validate() {
    if (this.id !== undefined && this.id.length === 0)
      return err(new EmptyPropertyError("ID", this.entityName));
  }
}
