/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useCustomQuery } from "@hooks";
import { fetchJobs } from "@api";

type TLocation = string;

type TProps = {
  value?: TLocation | null;
  onChange: (value: TLocation | null) => void;
  variant?: "filled" | "outlined" | "standard";
  size?: "small" | "medium";
  width?: number | string;
  placeholder?: string;
};

export const LocationDropdown = (props: TProps): JSX.Element => {
  const {
    value,
    onChange,
    variant = "outlined",
    size = "small",
    width = "100%",
    placeholder,
  } = props;

  const { data } = useCustomQuery(
    ["jobs", { limit: 10, offset: 0 }],
    fetchJobs
  );

  const locationList: TLocation[] = useMemo(() => {
    if (!data) return [];

    // Extract locations from job data
    const locations: Set<string> = new Set();
    data.jdList.forEach((job: any) => {
      if (job.location && job.location !== "remote") {
        locations.add(job.location);
      }
    });

    return Array.from(locations);
  }, [data]);

  return (
    <Autocomplete
      value={value}
      options={locationList}
      getOptionLabel={(option) => option}
      onChange={(_, value) => onChange(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          variant={variant}
          fullWidth
          size={size}
          style={{ width: width }}
        />
      )}
    />
  );
};
