import { z } from "zod";
export const LoginSchema = z.object({
  email: z.string().email("Insira um email válido"),
  password: z
    .string()
    .refine(
      (value) => /[0-9]/.test(value) && /[a-zA-Z]/.test(value),
      "Senha deve conter ter números e letras",
    ),
});

export type LoginFormType = z.infer<typeof LoginSchema>;
