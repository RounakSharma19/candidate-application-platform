import { capitalizeFirst } from "./capitalizeFirst";

export const getFullName = (
  firstName: string,
  lastName: string,
  middleName?: string
): string => {
  let fullName = "";

  fullName += capitalizeFirst(firstName);
  if (middleName) fullName += " " + capitalizeFirst(middleName);
  fullName += " " + capitalizeFirst(lastName);

  return fullName;
};
