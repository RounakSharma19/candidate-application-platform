export const isEmptyArray = (value: unknown) => {
  if (!Array.isArray(value)) {
    return true;
  }
  return value.length === 0;
};
