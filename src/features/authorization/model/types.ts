export type Me = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[]; // for display only, never use for access checks
  permissions: string[];
};
