import crypto from 'crypto';

import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_PRIVATE_KEY: z.string().optional(),
  JWT_PUBLIC_KEY: z.string().optional(),
  JWT_REFRESH_SECRET: z.string().min(1),
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number().int().positive(),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),
  FRONTEND_ORIGIN: z.string().url(),
  API_ORIGIN: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

type RawEnv = z.infer<typeof envSchema>;

export type Env = Omit<RawEnv, 'JWT_PRIVATE_KEY' | 'JWT_PUBLIC_KEY'> & {
  JWT_PRIVATE_KEY: string;
  JWT_PUBLIC_KEY: string;
};

const parsed = envSchema.parse(process.env);

let env: Env;

if (parsed.NODE_ENV === 'production' && (!parsed.JWT_PRIVATE_KEY || !parsed.JWT_PUBLIC_KEY)) {
  throw new Error('JWT_PRIVATE_KEY and JWT_PUBLIC_KEY are required in production');
}

if (!parsed.JWT_PRIVATE_KEY || !parsed.JWT_PUBLIC_KEY) {
  if (parsed.NODE_ENV !== 'development') {
    throw new Error('JWT_PRIVATE_KEY and JWT_PUBLIC_KEY are required unless NODE_ENV=development');
  }

  process.stderr.write(
    '\n=== WARNING ===\nJWT_PRIVATE_KEY and JWT_PUBLIC_KEY were not provided.\nGenerating an ephemeral RSA keypair for this development process only.\n================\n',
  );

  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
  });

  env = {
    ...parsed,
    JWT_PRIVATE_KEY: privateKey,
    JWT_PUBLIC_KEY: publicKey,
  };
} else {
  env = {
    ...parsed,
    JWT_PRIVATE_KEY: parsed.JWT_PRIVATE_KEY,
    JWT_PUBLIC_KEY: parsed.JWT_PUBLIC_KEY,
  };
}

export { env };
