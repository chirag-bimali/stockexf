import type { SignupValues } from "./schema";

/** Throw this from `signup` when the backend says the email is already registered. */
export class EmailAlreadyExistsError extends Error {}

/**
 * TODO: replace with the real call to your backend sign-up endpoint.
 * - Throw `EmailAlreadyExistsError` if the email is taken (shown under the email field).
 * - Throw any other Error with a user-friendly message (shown in the form's alert box).
 */
export const signup = async (_values: SignupValues): Promise<void> => {
  throw new Error("Sign-up API is not connected yet.");
};
