"use client";

import { Button } from "@client/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@client/components/ui/form";
import { Input } from "@client/components/ui/input";
import { useLoginLogic } from "./logic";

export function LoginForm() {
  const { form, submit, isPending } = useLoginLogic();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => submit(values))}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Área Administrativa</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Faça login para acessar o painel administrativo.
          </p>
        </div>

        <div className="grid gap-6">
          <FormField
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Usuário</FormLabel>
                <FormControl>
                  <Input id="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            control={form.control}
          />

          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input id="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            control={form.control}
          />

          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? "Entrando..." : "Entrar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
