import { object, prettifyError, url } from "zod";

export const envSchema = object({
  nextPublicBaseUrl: url().default("http://127.0.0.1:3000"),
});

const maybeEnv = {
  nextPublicBaseUrl: process.env.NEXT_PUBLIC_BASE_URL,
};

export const env = envSchema.parse(maybeEnv);

export function validateEnv() {
  const result = envSchema.safeParse(maybeEnv);
  if (!result.success) {
    console.error("❌ Invalid environment variables:");
    console.error(prettifyError(result.error));
    process.exit(1);
  }
}
