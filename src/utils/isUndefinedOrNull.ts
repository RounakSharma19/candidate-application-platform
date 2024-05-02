export const isUndefinedOrNull = (value: number | string) => {
  return value === undefined || value === null ? "-" : value;
};
