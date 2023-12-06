import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';
import packageJson from '../../package.json';
dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVarsSchema = z.object({
  BE_VERSION: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.number().or(z.string().regex(/\d+/).transform(Number)),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_NAME: z.string(),
  FRONTEND_URLS: z.string(),
  JWT_ACCESS_EXPIRATION_DAYS: z.coerce.number().positive(),
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(['prod', 'dev', 'staging', 'test'] as const),
  SERVER_PORT: z.number().or(z.string().regex(/\d+/).transform(Number)).default(4321),
  SUBSMANAGER_PROJECT_ID: z.coerce.number()
});

let envConfig: z.infer<typeof envVarsSchema> = process.env as any;

try {
  envConfig = envVarsSchema.parse({
    ...process.env,
    BE_VERSION: packageJson.version
  });
}
catch(err) {
  // console.log(errors?.errors, errors instanceof z.ZodError)
  if (err instanceof z.ZodError) {
    throw new Error(`Config validation error: ${err.errors.map((error) => `${error.path.join(', ')}: ${error.code} ~ ${error.message}`). join(', ')}`);
  }
};

export default envConfig!;