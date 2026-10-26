import type { SignupValues } from "../model";
import { api } from "@shared/api";

// /** Throw this from `signup` when the backend says the email is already registered. */
// export class EmailAlreadyExistsError extends Error {}

export const signup = async (_values: SignupValues): Promise<string> => {
  return api.post<string>("/Auth/signup", _values);
};
