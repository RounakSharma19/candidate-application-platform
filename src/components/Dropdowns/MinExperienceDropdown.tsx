/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { Autocomplete, Divider, TextField } from "@mui/material";
import { useCustomQuery } from "@hooks";
import { fetchJobs } from "@api";

type TExperienceLevel = {
  minExp: number;
  maxExp: number;
  label: string;
};

type TProps = {
  value?: TExperienceLevel | null;
  onChange: (value: TExperienceLevel | null) => void;
  variant?: "filled" | "outlined" | "standard";
  size?: "small" | "medium";
  width?: number | string;
  placeholder?: string;
};

export const MinExperienceDropdown = (props: TProps): JSX.Element => {
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

  const experienceLevels: TExperienceLevel[] = useMemo(() => {
    if (!data) return [];

    // Map over the job data to extract min and max experience levels
    const minExpList: number[] = data.jdList
      .map((job: any) => job?.minExp)
      .filter((exp: string) => exp !== null);
    const maxExpList: number[] = data.jdList
      .map((job: any) => job?.maxExp)
      .filter((exp: string) => exp !== null);

    // Get the minimum and maximum values from the lists
    const minExp = Math.min(...minExpList);
    const maxExp = Math.max(...maxExpList);

    // Generate the experience levels array
    const levels: TExperienceLevel[] = [];
    for (let i = minExp; i <= maxExp; i++) {
      const nextExp = i + 1;
      levels.push({
        minExp: i,
        maxExp: nextExp,
        label: `${i}-${nextExp} years`,
      });
    }

    return levels;
  }, [data]);

  return (
    <Autocomplete
      value={value}
      options={experienceLevels}
      getOptionLabel={(option) => option.label}
      onChange={(_, value) => onChange(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          variant={variant}
          fullWidth
          size={size}
          style={{ width: width }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                <Divider orientation="vertical" flexItem />
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
