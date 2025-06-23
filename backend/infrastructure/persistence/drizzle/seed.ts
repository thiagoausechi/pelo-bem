/* eslint-disable drizzle/enforce-delete-with-where */
import { genders, species } from "@core/contracts/enums/pets";
import { SpeciesInfo } from "@core/contracts/enums/pets/species.info";
import {
  ratings,
  serviceOrderStatus,
} from "@core/contracts/enums/service-orders";
import { brazilianStates } from "@core/contracts/enums/veterinarians";
import { fakerPT_BR as faker } from "@faker-js/faker";
import type { PgTableWithColumns, TableConfig } from "drizzle-orm/pg-core";
import { db } from ".";
import * as schema from "./models/schema";

export class Seeder {
  private static readonly NUM_OWNERS = 10;
  private static readonly NUM_PETS = 20;
  private static readonly NUM_VETERINARIANS = 5;
  private static readonly NUM_SERVICE_ORDERS = Seeder.NUM_PETS * 2;

  static async seed() {
    console.log("🌱 Iniciando o seeding do banco de dados...");

    await this.truncateTables();
    await this.generateData();

    console.log("✅ Seeding concluído com sucesso!");
  }

  private static async truncateTables() {
    console.log("🧹 Limpando todas as tabelas...");

    // A ordem de exclusão é importante para evitar erros de chave estrangeira
    await db.delete(schema.satisfactions);
    await db.delete(schema.serviceOrders);
    await db.delete(schema.serviceTypes);
    await db.delete(schema.veterinarians);
    await db.delete(schema.pets);
    await db.delete(schema.owners);
  }

  private static async generateData() {
    console.log("📦 Gerando dados...");

    const veterinarians = await this.generateVeterinarians();

    const owners = await this.generateOwners();
    const pets = await this.generatePets({ owners });

    const serviceTypes = await this.generateServiceTypes();

    const serviceOrders = await this.generateServiceOrders({
      pets,
      veterinarians,
      serviceTypes,
    });

    await this.generateSatisfactions({ serviceOrders });
  }

  // === GERADORES ===

  private static async generate<T extends TableConfig>({
    quantity,
    generateFn,
    table,
  }: {
    quantity: number;
    generateFn: () => typeof table.$inferInsert;
    table: PgTableWithColumns<T>;
  }) {
    const data = Array.from({ length: quantity }, generateFn);
    return await db
      .insert(table)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
      .values(data as any)
      .returning();
  }

  private static async generateVeterinarians() {
    return await this.generate({
      table: schema.veterinarians,
      quantity: this.NUM_VETERINARIANS,
      generateFn: () => {
        const brazilianState = faker.helpers.arrayElement(brazilianStates);
        const licenseNumber = faker.string.numeric({
          length: 5,
          allowLeadingZeros: true,
        });

        return {
          fullname: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.string.numeric({ length: 11, allowLeadingZeros: true }),
          license: `CRMV-${brazilianState} ${licenseNumber}`,
        };
      },
    });
  }

  private static async generateOwners() {
    return await this.generate({
      table: schema.owners,
      quantity: this.NUM_OWNERS,
      generateFn: () => ({
        fullname: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.string.numeric({ length: 11, allowLeadingZeros: true }),
      }),
    });
  }

  private static async generatePets({
    owners,
  }: {
    owners: schema.PgOwnerInsertModel[];
  }) {
    return await this.generate({
      table: schema.pets,
      quantity: this.NUM_PETS,
      generateFn: () => {
        const specie = faker.helpers.arrayElement(species);
        const breed =
          specie === "CAT"
            ? faker.animal.cat()
            : specie === "DOG"
              ? faker.animal.dog()
              : specie === "BIRD"
                ? faker.animal.bird()
                : faker.animal.type();

        return {
          ownerId: faker.helpers.arrayElement(owners).id!,
          name: faker.animal.petName(),
          specie,
          breed,
          birthday: faker.date.birthdate({ min: 1, max: 15, mode: "age" }),
          weightGrams:
            faker.number.int({
              min: SpeciesInfo[specie].weightKg.min,
              max: SpeciesInfo[specie].weightKg.max,
            }) * 1000, // Convertendo para gramas
          heightCm: faker.number.int({
            min: SpeciesInfo[specie].heightCm.min,
            max: SpeciesInfo[specie].heightCm.max,
          }),
          gender: faker.helpers.arrayElement(genders),
        };
      },
    });
  }

  private static async generateServiceTypes() {
    return await db
      .insert(schema.serviceTypes)
      .values([
        {
          name: "Consulta",
          description: "Consulta veterinária geral",
          price: 100,
        },
        {
          name: "Vacinação",
          description: "Vacinação anual para cães e gatos",
          price: 80,
        },
        {
          name: "Banho e Tosa",
          description: "Serviço de banho e tosa para pets",
          price: 60,
        },
        {
          name: "Exame de Sangue",
          description: "Exame de sangue completo para pets",
          price: 150,
        },
        {
          name: "Check-up Geral",
          description: "Check-up completo para avaliação da saúde do pet",
          price: 200,
        },
      ])
      .returning();
  }

  private static async generateServiceOrders({
    pets,
    veterinarians,
    serviceTypes,
  }: {
    pets: schema.PgPetInsertModel[];
    veterinarians: schema.PgVeterinarianInsertModel[];
    serviceTypes: schema.PgServiceTypeInsertModel[];
  }) {
    return this.generate({
      table: schema.serviceOrders,
      quantity: this.NUM_SERVICE_ORDERS,
      generateFn: () => {
        const veterinarian = faker.helpers.arrayElement(veterinarians);

        const pet = faker.helpers.arrayElement(pets);
        const serviceType =
          pet.specie === "BIRD"
            ? serviceTypes[0]! // Se for um pássaro, só permite consultas
            : faker.helpers.arrayElement(serviceTypes);

        const status = faker.helpers.arrayElement(serviceOrderStatus);
        const appointmentDate =
          status === "PENDING"
            ? faker.date.future()
            : status === "COMPLETED"
              ? faker.date.past()
              : // status === "CANCELED"
                faker.number.binary() === "0"
                ? faker.date.past()
                : faker.date.future();

        return {
          petId: pet.id!,
          veterinarianId: veterinarian.id!,
          serviceTypeId: serviceType.id!,
          status,
          appointmentDate,
        };
      },
    });
  }

  private static async generateSatisfactions({
    serviceOrders,
  }: {
    serviceOrders: schema.PgServiceOrderInsertModel[];
  }) {
    const completedOrders = serviceOrders.filter(
      (order) => order.status === "COMPLETED",
    );
    let serviceOrderIndex = 0;

    return this.generate({
      table: schema.satisfactions,
      quantity: completedOrders.length,
      generateFn: () => ({
        serviceOrderId: completedOrders[serviceOrderIndex++]!.id!,
        rating: faker.helpers.arrayElement(ratings),
        comment: faker.lorem.sentence(),
      }),
    });
  }
}
