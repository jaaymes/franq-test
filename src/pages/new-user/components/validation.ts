import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const schemaNewUser = z.object({
  email: z
    .string({
      required_error: 'Email é obrigatório',
    })
    .email({
      message: 'Email inválido',
    }),
  password: z
    .string({
      required_error: 'Senha é obrigatória',
    })
    .min(8, {
      message: 'Senha deve ter pelo menos 8 caracteres',
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message:
        'Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um símbolo',
    }),
  name: z
    .string({
      required_error: 'Nome é obrigatório',
    })
    .min(3, {
      message: 'Nome deve ter pelo menos 3 caracteres',
    }),
});

export const formSchemaNewUser = toTypedSchema(schemaNewUser);
