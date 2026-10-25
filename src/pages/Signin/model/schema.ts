import { z } from "zod";

export const PASSWORD_HINT = "Must be at least 8 characters with one number";

export const signinSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .pipe(z.email("Please enter a valid email address")),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, PASSWORD_HINT)
    .regex(/\d/, PASSWORD_HINT),
  remember: z.boolean(),
});

export type SigninValues = z.infer<typeof signinSchema>;
