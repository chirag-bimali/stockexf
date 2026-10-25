import { z } from "zod";

export const PASSWORD_HINT =
  "8+ characters, upper & lower case, special symbol included.";
export const TERMS_ERROR =
  "You must accept the Terms of Service and Privacy Policy to create a trading account.";
export const EMAIL_TAKEN_MESSAGE =
  "This email address is already associated with an active Stockex account.";

export const signupSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your legal first name."),
  lastName: z.string().trim().min(1, "Please enter your legal last name."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .pipe(z.email("Please enter a valid email address")),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, PASSWORD_HINT)
    .regex(/[a-z]/, PASSWORD_HINT)
    .regex(/[A-Z]/, PASSWORD_HINT)
    .regex(/[^A-Za-z0-9]/, PASSWORD_HINT),
  acceptTerms: z.boolean().refine((v) => v, TERMS_ERROR),
});

export type SignupValues = z.infer<typeof signupSchema>;
