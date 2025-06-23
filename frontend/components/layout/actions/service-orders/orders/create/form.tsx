"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@client/components/ui/avatar";
import { Button } from "@client/components/ui/button";
import { Calendar } from "@client/components/ui/calendar";
import { DrawerClose, DrawerFooter } from "@client/components/ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@client/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@client/components/ui/popover";
import { SelectorField } from "@client/components/ui/selector-field";
import { cn } from "@client/lib/utils";
import { acronym } from "@core/acronym";
import { format } from "date-fns";
import { CalendarIcon, CheckIcon } from "lucide-react";
import React from "react";
import { ptBR } from "react-day-picker/locale";
import { useCreateServiceOrderLogic } from "./logic";

export function CreateServiceOrderForm() {
  const {
    form,
    submit,
    isPending,
    enableFormFields,
    serviceTypesList,
    petsList,
    veterinariansList,
  } = useCreateServiceOrderLogic();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => submit(values))}
        className="flex h-full flex-col"
      >
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-4 text-sm">
          <div className="flex flex-col gap-4">
            <FormField
              name="serviceTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Serviço</FormLabel>
                  <FormControl>
                    <SelectorField
                      options={serviceTypesList.data}
                      disabled={
                        serviceTypesList.isLoading || serviceTypesList.isError
                      }
                      getOptionValue={({ id }) => id}
                      getOptionLabel={({ name }) => (
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col gap-0.5">
                            <p className="text-sm leading-none font-medium">
                              {name}
                            </p>
                          </div>
                        </div>
                      )}
                      placeholder={
                        serviceTypesList.isLoading
                          ? "Carregando..."
                          : "Selecione um tipo de serviço..."
                      }
                      searchPlaceholder="Busque um tipo de serviço..."
                      renderOption={({ name }, selected) => (
                        <div className="flex items-center gap-4">
                          {selected ? (
                            <CheckIcon className="size-4" />
                          ) : (
                            <div className="size-4" />
                          )}
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
                    Selecione o tipo de serviço que deseja agendar.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
            />

            <FormField
              name="petId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pet</FormLabel>
                  <FormControl>
                    <SelectorField
                      options={petsList.data}
                      disabled={petsList.isLoading || petsList.isError}
                      getOptionValue={({ id }) => id}
                      getOptionLabel={({ picture, name }) => (
                        <div className="flex items-center gap-4">
                          <Avatar className="border">
                            {picture && (
                              <AvatarImage
                                src={picture}
                                alt={`Pré-visualização do retrato do ${name}`}
                              />
                            )}
                            <AvatarFallback>
                              {acronym(name, { maxWords: 2 })}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col gap-0.5">
                            <p className="text-sm leading-none font-medium">
                              {name}
                            </p>
                          </div>
                        </div>
                      )}
                      placeholder={
                        petsList.isLoading
                          ? "Carregando..."
                          : "Selecione um pet..."
                      }
                      searchPlaceholder="Busque um pet..."
                      renderOption={({ picture, name }, selected) => (
                        <div className="flex items-center gap-4">
                          {selected ? (
                            <CheckIcon className="size-4" />
                          ) : (
                            <div className="size-4" />
                          )}
                          <Avatar className="border">
                            {picture && (
                              <AvatarImage
                                src={picture}
                                alt={`Retrato do pet ${name}`}
                              />
                            )}
                            <AvatarFallback>
                              {acronym(name, { maxWords: 2 })}
                            </AvatarFallback>
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
                    Selecione o pet que será atendido.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
            />

            <FormField
              name="veterinarianId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Veterinário</FormLabel>
                  <FormControl>
                    <SelectorField
                      options={veterinariansList.data}
                      disabled={
                        veterinariansList.isLoading || veterinariansList.isError
                      }
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
                            <AvatarFallback>
                              {acronym(name, { maxWords: 2 })}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col gap-0.5">
                            <p className="text-sm leading-none font-medium">
                              {name}
                            </p>
                          </div>
                        </div>
                      )}
                      placeholder={
                        veterinariansList.isLoading
                          ? "Carregando..."
                          : "Selecione um Veterinário..."
                      }
                      searchPlaceholder="Busque um veterinário..."
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
                                alt={`Imagem de perfil ${name}`}
                              />
                            )}
                            <AvatarFallback>
                              {acronym(name, { maxWords: 2 })}
                            </AvatarFallback>
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
                    Selecione o veterinário realizará o atendimento.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
            />

            {enableFormFields && (
              <React.Fragment>
                <FormField
                  name="appointmentDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data do Atendimento</FormLabel>
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
                            disabled={(date) => date < new Date()}
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                  control={form.control}
                />
              </React.Fragment>
            )}
          </div>
        </div>

        <DrawerFooter>
          <Button
            disabled={isPending || !enableFormFields}
            type="submit"
            className="w-full"
          >
            {isPending ? "Aguarde" : "Agendar"}
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
