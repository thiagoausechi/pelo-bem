import { genders, species } from "@core/contracts/enums/pets";
import { SpeciesInfo } from "@core/contracts/enums/pets/species.info";
import {
  ratings,
  serviceOrderStatus,
} from "@core/contracts/enums/service-orders";
import { brazilianStates } from "@core/contracts/enums/veterinarians";
import { fakerPT_BR as faker } from "@faker-js/faker";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { PgTableWithColumns, TableConfig } from "drizzle-orm/pg-core";
import { db } from ".";
import * as schema from "./models/schema";

export class Seeder {
  private static readonly NUM_OWNERS = 10;
  private static readonly NUM_PETS = 20;
  private static readonly NUM_VETERINARIANS = 5;
  private static readonly NUM_SERVICE_ORDERS = Seeder.NUM_PETS * 2;

  private tx!: NodePgDatabase<typeof schema>;

  async seed() {
    console.log("🌱 Iniciando o seeding do banco de dados...");

    await db.transaction(async (tx) => {
      this.tx = tx;

      // Usando a transação para garantir que todas as operações sejam atômicas
      await this.truncateTables();
      await this.generateData();
    });

    console.log("✅ Seeding concluído com sucesso!");
  }

  private async truncateTables() {
    console.log("🧹 Limpando todas as tabelas...");

    // A ordem de exclusão é importante para evitar erros de chave estrangeira
    await this.tx.delete(schema.satisfactions);
    await this.tx.delete(schema.serviceOrders);
    await this.tx.delete(schema.serviceTypes);
    await this.tx.delete(schema.veterinarians);
    await this.tx.delete(schema.pets);
    await this.tx.delete(schema.owners);
  }

  private async generateData() {
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

  private async generate<T extends TableConfig>({
    quantity,
    generateFn,
    table,
  }: {
    quantity: number;
    generateFn: () => typeof table.$inferInsert;
    table: PgTableWithColumns<T>;
  }) {
    const data = Array.from({ length: quantity }, generateFn);
    return await this.tx
      .insert(table)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
      .values(data as any)
      .returning();
  }

  private async generateVeterinarians() {
    return await this.generate({
      table: schema.veterinarians,
      quantity: Seeder.NUM_VETERINARIANS,
      generateFn: () => {
        const fullname = faker.person.fullName();
        const firstName = fullname.split(" ")[0];
        const lastName = fullname.split(" ")[1];
        const email = faker.internet.email({ firstName, lastName });

        const brazilianState = faker.helpers.arrayElement(brazilianStates);
        const licenseNumber = faker.string.numeric({
          length: 5,
          allowLeadingZeros: true,
        });

        return {
          fullname,
          email,
          phone: faker.string.numeric({ length: 11, allowLeadingZeros: true }),
          license: `CRMV-${brazilianState} ${licenseNumber}`,
        };
      },
    });
  }

  private async generateOwners() {
    console.log(`\t- Gerando ${Seeder.NUM_OWNERS} donos de pets...`);

    return await this.generate({
      table: schema.owners,
      quantity: Seeder.NUM_OWNERS,
      generateFn: () => {
        const fullname = faker.person.fullName();
        const firstName = fullname.split(" ")[0];
        const lastName = fullname.split(" ")[1];
        const email = faker.internet.email({ firstName, lastName });

        return {
          fullname,
          email,
          phone: faker.string.numeric({ length: 11, allowLeadingZeros: true }),
        };
      },
    });
  }

  private async generatePets({
    owners,
  }: {
    owners: schema.PgOwnerInsertModel[];
  }) {
    console.log(`\t- Gerando ${Seeder.NUM_PETS} pets...`);

    return await this.generate({
      table: schema.pets,
      quantity: Seeder.NUM_PETS,
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
          weightKg: parseFloat(
            faker.number
              .float({
                min: SpeciesInfo[specie].weightKg.min,
                max: SpeciesInfo[specie].weightKg.max,
              })
              .toFixed(3),
          ),
          heightCm: faker.number.int({
            min: SpeciesInfo[specie].heightCm.min,
            max: SpeciesInfo[specie].heightCm.max,
          }),
          gender: faker.helpers.arrayElement(genders),
        };
      },
    });
  }

  private async generateServiceTypes() {
    console.log(`\t- Gerando tipos de serviços pré-definidos...`);

    return await this.tx
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

  private async generateServiceOrders({
    pets,
    veterinarians,
    serviceTypes,
  }: {
    pets: schema.PgPetInsertModel[];
    veterinarians: schema.PgVeterinarianInsertModel[];
    serviceTypes: schema.PgServiceTypeInsertModel[];
  }) {
    console.log(
      `\t- Gerando ${Seeder.NUM_SERVICE_ORDERS} ordens de serviço...`,
    );

    return this.generate({
      table: schema.serviceOrders,
      quantity: Seeder.NUM_SERVICE_ORDERS,
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

  private async generateSatisfactions({
    serviceOrders,
  }: {
    serviceOrders: schema.PgServiceOrderInsertModel[];
  }) {
    const completedOrders = serviceOrders.filter(
      (order) => order.status === "COMPLETED",
    );
    let serviceOrderIndex = 0;

    console.log(`\t- Gerando ${completedOrders.length} avaliações...`);

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
