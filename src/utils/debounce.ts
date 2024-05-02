/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = (func: (...args: any) => void, delay: number) => {
  let timeout: any;

  return (...args: any) => {
    const handler = () => {
      if (timeout) clearTimeout(timeout);
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(handler, delay);
  };
};
