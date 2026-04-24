import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_PRIVATE_KEY: z.string().optional(),
  JWT_PUBLIC_KEY: z.string().optional(),
  JWT_REFRESH_SECRET: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string().transform((v) => parseInt(v, 10)),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  FRONTEND_ORIGIN: z.string().url(),
  API_ORIGIN: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export type Env = z.infer<typeof envSchema>;

let env: Env;

try {
  const parsed = envSchema.parse(process.env);
  if (parsed.NODE_ENV === 'production' && (!parsed.JWT_PRIVATE_KEY || !parsed.JWT_PUBLIC_KEY)) {
    throw new Error('JWT_PRIVATE_KEY and JWT_PUBLIC_KEY are required in production');
  }
  if (parsed.NODE_ENV === 'development' && (!parsed.JWT_PRIVATE_KEY || !parsed.JWT_PUBLIC_KEY)) {
    console.warn('⚠️ WARNING: JWT keys are missing. Using ephemeral keys for development.');
    // In a real scenario, we'd generate keys here, but for now we'll just allow them to be undefined
    // and the auth service will handle the generation if needed.
  }
  env = parsed as Env;
} catch (error) {
  if (process.env['NODE_ENV'] === 'test') {
    // Provide defaults for testing if needed, or skip validation
    env = {} as Env;
  } else {
    console.error('❌ Invalid environment variables:', JSON.stringify(error, null, 2));
    throw new Error('Invalid environment variables');
  }
}

export { env };
