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
import { AVATAR_INPUT_ACCEPT } from "@core/contracts/avatar-picutre";
import { useCreateOwnerLogic } from "./logic";

export function CreateOwnerForm() {
  const { form, submit, isPending, previewUrl } = useCreateOwnerLogic();

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
                    <Input placeholder="Nome do Cuidador" {...field} />
                  </FormControl>
                  <FormDescription>
                    Insira o nome completo do cuidador.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
            />

            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="cuidador@exemplo.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Insira o e-email do cuidador.
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
                    Insira o telefone de contato do cuidador.
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
                      Insira a foto de perfil do cuidador.
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
