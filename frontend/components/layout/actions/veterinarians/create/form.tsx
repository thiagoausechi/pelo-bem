"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@client/components/ui/avatar";
import { Button } from "@client/components/ui/button";
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
import { Input } from "@client/components/ui/input";
import { Label } from "@client/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@client/components/ui/select";
import { AVATAR_INPUT_ACCEPT } from "@core/contracts/avatar-picutre";
import {
  brazilianStates,
  BrazilianStatesInfo,
} from "@core/contracts/enums/veterinarians";
import { useCreateVeterinarianLogic } from "./logic";

export function CreateVeterinarianForm() {
  const { form, submit, isPending, previewUrl } = useCreateVeterinarianLogic();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => submit(values))}
        className="flex h-full flex-col"
      >
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-4 text-sm">
          <div className="flex flex-col gap-4">
            <FormField
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do Veterinário" {...field} />
                  </FormControl>
                  <FormDescription>
                    Insira o nome completo do veterinário.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
            />

            <div className="grid gap-2">
              <Label>Licença</Label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  type="button"
                  autoFocus={false}
                  className="border-input bg-input/30 hover:bg-input/30 cursor-default rounded-r-none border-r-0"
                  asChild
                >
                  <div>CRMV</div>
                </Button>

                <FormField
                  name="licenseState"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-input/30 rounded-l-none border-l-0">
                            <SelectValue>{field.value}</SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {brazilianStates.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state} - {BrazilianStatesInfo[state].name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                  control={form.control}
                />

                <div className="px-2">-</div>

                <FormField
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="12345" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                  control={form.control}
                />
              </div>
            </div>

            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="veterinario@exemplo.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Insira o e-email do veterinário.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
            />

            <FormField
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="(99) 99999-9999" {...field} />
                  </FormControl>
                  <FormDescription>
                    Insira o telefone de contato do veterinário.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
            />

            <div className="flex items-center gap-2">
              <FormField
                name="profilePicture"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Foto de Perfil</FormLabel>
                    <div className="flex items-center gap-2">
                      <Avatar size="md">
                        {previewUrl && (
                          <AvatarImage
                            src={previewUrl}
                            alt="Pré-visualização da foto de perfil"
                          />
                        )}
                        <AvatarFallback />
                      </Avatar>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Selecione uma foto de perfil"
                          type="file"
                          onChange={(event) =>
                            onChange(event.target.files?.[0])
                          }
                          accept={AVATAR_INPUT_ACCEPT}
                        />
                      </FormControl>
                    </div>
                    <FormDescription>
                      Insira a foto de perfil do veterinário.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
                control={form.control}
              />
            </div>
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
