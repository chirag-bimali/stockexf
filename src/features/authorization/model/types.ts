export type Me = {
  id: string;
  email: string;
  roles: string[]; // for display only, never use for access checks
  permissions: string[];
};
