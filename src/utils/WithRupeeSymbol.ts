export const WithRupeeSymbol = (value: number): string => {
  return value === undefined || value === null ? "-" : `₹${value.toFixed(2)}`;
};
