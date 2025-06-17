import { SpeciesInfo, type Specie } from "@core/contracts/enums/pets";
import { err, ok, type Result } from "@core/result";
import {
  EmptyPropertyError,
  TooHighValueError,
  TooLowValueError,
} from "@server/domain/errors";
import { BaseEntity, type BaseEntityProps } from "../base";
import { Owner } from "../owner";
import type { Gender } from "./gender.enum";

interface PetProps extends BaseEntityProps {
  ownerId: string;
  name: string;
  specie: Specie;
  breed: string;
  birthday: Date;
  weightKg: number;
  heightCm: number;
  gender: Gender;
}

export class Pet extends BaseEntity {
  public static readonly ENTITY_NAME = "animal de estimação";

  public readonly ownerId: string;
  public readonly name: string;
  public readonly specie: Specie;
  public readonly breed: string;
  public readonly birthday: Date;
  public readonly weightKg: number;
  public readonly heightCm: number;
  public readonly gender: Gender;

  private constructor(props: PetProps) {
    super(Pet.ENTITY_NAME, props);

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
    const { ownerId, name, specie, breed, weightKg, heightCm } = props;

    if (ownerId.length === 0)
      return err(
        new EmptyPropertyError("ID do " + Owner.ENTITY_NAME, Pet.ENTITY_NAME),
      );

    if (name.length === 0)
      return err(new EmptyPropertyError("Nome", Pet.ENTITY_NAME));

    if (breed.length === 0)
      return err(new EmptyPropertyError("Raça", Pet.ENTITY_NAME));

    if (weightKg < SpeciesInfo[specie].weightKg.min)
      return err(new TooLowValueError("Peso", Pet.ENTITY_NAME));

    if (weightKg > SpeciesInfo[specie].weightKg.max)
      return err(new TooHighValueError("Peso", Pet.ENTITY_NAME));

    if (heightCm < SpeciesInfo[specie].heightCm.min)
      return err(new TooLowValueError("Altura", Pet.ENTITY_NAME));

    if (heightCm > SpeciesInfo[specie].heightCm.max)
      return err(new TooHighValueError("Altura", Pet.ENTITY_NAME));

    const pet = new Pet(props);
    return pet.validate() ?? ok(pet);
  }
}
