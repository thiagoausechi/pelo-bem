"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@client/components/ui/avatar";
import { Button } from "@client/components/ui/button";
import { Calendar } from "@client/components/ui/calendar";
import { DrawerClose, DrawerFooter } from "@client/components/ui/drawer";
import { SelectRadioGroup } from "@client/components/ui/enum-field";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@client/components/ui/form";
import { Input } from "@client/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@client/components/ui/popover";
import { SelectorField } from "@client/components/ui/selector-field";
import { cn } from "@client/lib/utils";
import { capitalize } from "@core/capitalize";
import { AVATAR_INPUT_ACCEPT } from "@core/contracts/avatar-picutre";
import { genders, species } from "@core/contracts/enums/pets";
import { GendersInfo } from "@core/contracts/enums/pets/genders.info";
import { SpeciesInfo } from "@core/contracts/enums/pets/species.info";
import { format } from "date-fns";
import { CalendarIcon, CheckIcon } from "lucide-react";
import React from "react";
import { ptBR } from "react-day-picker/locale";
import { useCreatePetLogic } from "./logic";

export function CreatePetForm() {
  const {
    form,
    submit,
    isPending,
    ownersList,
    isLoadingOwners,
    isErrorOwners,
    ownerSelected,
    previewUrl,
  } = useCreatePetLogic();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => submit(values))}
        className="flex h-full flex-col"
      >
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-4 text-sm">
          <div className="flex flex-col gap-4">
            <FormField
              name="ownerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuidador</FormLabel>
                  <FormControl>
                    <SelectorField
                      options={ownersList}
                      disabled={isLoadingOwners || isErrorOwners}
                      getOptionValue={({ id }) => id}
                      getOptionLabel={({ profile, name }) => (
                        <div className="flex items-center gap-4">
                          <Avatar className="border">
                            {profile && (
                              <AvatarImage
                                src={profile}
                                alt={`Pré-visualização do retrato do ${name}`}
                              />
                            )}
                            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col gap-0.5">
                            <p className="text-sm leading-none font-medium">
                              {name}
                            </p>
                          </div>
                        </div>
                      )}
                      placeholder={
                        isLoadingOwners
                          ? "Carregando..."
                          : "Selecione um dono..."
                      }
                      searchPlaceholder="Busque um dono..."
                      renderOption={({ profile, name }, selected) => (
                        <div className="flex items-center gap-4">
                          {selected ? (
                            <CheckIcon className="size-4" />
                          ) : (
                            <div className="size-4" />
                          )}
                          <Avatar className="border">
                            {profile && (
                              <AvatarImage
                                src={profile}
                                alt={`Avatar do cuidador ${name}`}
                              />
                            )}
                            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col gap-0.5">
                            <p className="text-sm leading-none font-medium">
                              {name}
                            </p>
                          </div>
                        </div>
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Selecione o(a) dono(a) deste pet.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
            />

            {ownerSelected && (
              <React.Fragment>
                <div className="flex items-center gap-2">
                  <FormField
                    name="picture"
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Retrato do Pet</FormLabel>
                        <div className="flex items-center gap-2">
                          <Avatar size="md">
                            {previewUrl && (
                              <AvatarImage
                                src={previewUrl}
                                alt="Pré-visualização do retrato do animal"
                              />
                            )}
                            <AvatarFallback />
                          </Avatar>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Selecione uma foto de retrato"
                              type="file"
                              onChange={(event) =>
                                onChange(event.target.files?.[0])
                              }
                              accept={AVATAR_INPUT_ACCEPT}
                            />
                          </FormControl>
                        </div>
                        <FormDescription>
                          Insira a foto nítida e de fácil reconhecimento do pet.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                    control={form.control}
                  />
                </div>

                <FormField
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do Pet" {...field} />
                      </FormControl>
                      <FormDescription>Insira o nome do pet.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                  control={form.control}
                />

                <FormField
                  name="specie"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Espécie</FormLabel>
                      <FormControl>
                        <SelectRadioGroup
                          options={species.map((id) => ({
                            id,
                            ...SpeciesInfo[id],
                          }))}
                          getOptionValue={({ id }) => id}
                          renderOption={({ label, icon }) => (
                            <div className="flex flex-1 justify-between">
                              <div className="font-medium">
                                {capitalize(label)}
                              </div>
                              <div className="text-muted-foreground">
                                {icon}
                              </div>
                            </div>
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Selecione a espécie do pet.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                  control={form.control}
                />

                <FormField
                  name="breed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Raça</FormLabel>
                      <FormControl>
                        <Input placeholder="Golden, Beagle..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  control={form.control}
                />

                <FormField
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gênero</FormLabel>
                      <FormControl>
                        <SelectRadioGroup
                          className="grid-cols-2"
                          options={genders.map((id) => GendersInfo[id])}
                          getOptionValue={({ id }) => id}
                          renderOption={({ label, icon }) => (
                            <div className="flex flex-1 justify-between">
                              <div className="font-medium">
                                {capitalize(label)}
                              </div>
                              <div className="text-muted-foreground">
                                {icon}
                              </div>
                            </div>
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  control={form.control}
                />

                <FormField
                  name="birthday"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Nascimento</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Escolha uma data</span>
                              )}
                              <CalendarIcon className="text-muted-foreground ml-auto h-4 w-4" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            locale={ptBR}
                            lang="pt-BR"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                  control={form.control}
                />

                <div className="flex gap-4">
                  <FormField
                    name="weightKg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Peso</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="number"
                              className="flex-1 pr-10"
                              placeholder="10"
                              step={0.01}
                              min={0}
                              {...field}
                            />
                            <div className="absolute top-1/2 right-2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full font-bold">
                              kg
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    control={form.control}
                  />

                  <FormField
                    name="heightCm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Altura</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="number"
                              className="flex-1 pr-10"
                              placeholder="10"
                              min={0}
                              {...field}
                            />
                            <div className="absolute top-1/2 right-2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full font-bold">
                              cm
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    control={form.control}
                  />
                </div>
              </React.Fragment>
            )}
          </div>
        </div>

        <DrawerFooter>
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? "Aguarde" : "Adicionar"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full" type="button">
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </form>
    </Form>
  );
}
