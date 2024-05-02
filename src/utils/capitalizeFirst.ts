export const capitalizeFirst = (term: string) => {
  const builder = (term: string) => {
    const word = term.toString().split(" ");
    const lowerCase = word.map(
      (el) =>
        el.toLowerCase().charAt(0).toUpperCase() + el.toLowerCase().slice(1)
    );
    return lowerCase.join(" ");
  };

  if (term ?? null) {
    const result = builder(term);
    return result;
  }

  return "-";
};
