/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryFunction } from "@tanstack/react-query";

export const fetchJobs: QueryFunction<
  any,
  [string, { limit: number; offset: number; filters?: any }]
> = async ({ queryKey }) => {
  const [, { limit, offset, filters }] = queryKey;
  const response = await fetch(
    "https://api.weekday.technology/adhoc/getSampleJdJSON",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ limit, offset, filters }),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
