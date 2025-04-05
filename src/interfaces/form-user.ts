import type { z } from 'zod';

import { schemaLogin } from '@/pages/login/components/validation';
import type { schemaNewUser } from '@/pages/new-user/components/validation';

export type IFormLogin = z.infer<typeof schemaLogin>;
export type IFormNewUser = z.infer<typeof schemaNewUser>;
