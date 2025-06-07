import { err, ok, type Result } from "@core/result";
import {
  EmptyPropertyError,
  TooHighValueError,
  TooLowValueError,
} from "@server/domain/errors";
import { Owner } from "../owner";
import type { Gender } from "./gender.enum";
import { Species, type Specie } from "./species.enum";

interface PetProps {
  id?: string;
  ownerId: string;
  name: string;
  specie: Specie;
  breed: string;
  birthday: Date;
  weightKg: number;
  heightCm: number;
  gender: Gender;
}

export class Pet {
  public static readonly ENTITY_NAME = "animal de estimação";

  public readonly id?: string;
  public readonly ownerId: string;
  public readonly name: string;
  public readonly specie: Specie;
  public readonly breed: string;
  public readonly birthday: Date;
  public readonly weightKg: number;
  public readonly heightCm: number;
  public readonly gender: Gender;
  public readonly picture?: string;

  private constructor(props: PetProps) {
    this.id = props.id;
    this.ownerId = props.ownerId;
    this.name = props.name;
    this.specie = props.specie;
    this.breed = props.breed;
    this.birthday = props.birthday;
    this.weightKg = props.weightKg;
    this.heightCm = props.heightCm;
    this.gender = props.gender;
  }

  public static create(
    props: PetProps,
  ): Result<Pet, EmptyPropertyError | TooLowValueError | TooHighValueError> {
    const { id, ownerId, name, specie, breed, weightKg, heightCm } = props;

    if (id !== undefined && id.length === 0)
      return err(new EmptyPropertyError("ID", Pet.ENTITY_NAME));

    if (ownerId.length === 0)
      return err(
        new EmptyPropertyError("ID do " + Owner.ENTITY_NAME, Pet.ENTITY_NAME),
      );

    if (name.length === 0)
      return err(new EmptyPropertyError("Nome", Pet.ENTITY_NAME));

    if (breed.length === 0)
      return err(new EmptyPropertyError("Raça", Pet.ENTITY_NAME));

    if (weightKg < Species[specie].weightKg.min)
      return err(new TooLowValueError("Peso", Pet.ENTITY_NAME));

    if (weightKg > Species[specie].weightKg.max)
      return err(new TooHighValueError("Peso", Pet.ENTITY_NAME));

    if (heightCm < Species[specie].heightCm.min)
      return err(new TooLowValueError("Altura", Pet.ENTITY_NAME));

    if (heightCm > Species[specie].heightCm.max)
      return err(new TooHighValueError("Altura", Pet.ENTITY_NAME));

    return ok(new Pet({ ...props }));
  }
}
