import { z } from "zod";

export const loginForm = z.object({
  username: z.string().min(1, "Usuário é obrigatório."),
  password: z.string().min(1, "Senha é obrigatória."),
});

export type LoginFormData = z.infer<typeof loginForm>;
