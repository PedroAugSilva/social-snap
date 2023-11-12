import { endsWithForEmail } from "@/shared/constants";
import { z } from "zod";
export const RegisterClientSchema = z
  .object({
    firstname: z.string().min(1, "Preencha este campo"),
    lastname: z.string().min(1, "Preencha este campo"),
    password: z
      .string()
      .min(6, "A senha precisa ter mais de seis caracteres")
      .refine(
        (value) => /[0-9]/.test(value) && /[a-zA-Z]/.test(value),
        "Senha deve conter ter números e letras",
      ),
    confirmPassword: z.string().min(1, "Preencha este campo"),
    email: z
      .string()
      .min(1, "Insira um email válido (ex: @gmail.com)")
      .email("Insira um email válido (ex: @gmail.com)")
      .refine(
        (value) => endsWithForEmail.includes(value.split("@")[1]),
        "Insira um email válido (ex: @gmail.com)",
      ),
  })
  .superRefine((data, context) => {
    if (data.confirmPassword !== data.password) {
      context.addIssue({
        path: [...context.path, "confirmPassword"],
        message: "As senhas não são semelhantes",
        code: "custom",
      });
    }
  });
export type RegisterClientFormType = z.infer<typeof RegisterClientSchema>;
