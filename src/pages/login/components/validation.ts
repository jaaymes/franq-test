import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const schemaLogin = z.object({
  email: z
    .string({
      required_error: "Email é obrigatório",
    })
    .email({
      message: "Email inválido",
    }),
  password: z
    .string({
      required_error: "Senha é obrigatória",
    })
    .min(8, {
      message: "Senha deve ter pelo menos 8 caracteres",
    }),
});

export const formSchemaLogin = toTypedSchema(schemaLogin);
