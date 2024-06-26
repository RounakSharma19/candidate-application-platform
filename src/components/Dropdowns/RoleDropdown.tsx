/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, Divider, TextField } from "@mui/material";
import { useCustomQuery } from "@hooks";
import { fetchJobs } from "@api";

type TRole = {
  jobRole: string;
};

type TProps = {
  value?: TRole | null;
  onChange: (value: TRole | null) => void;
  variant?: "filled" | "outlined" | "standard";
  size?: "small" | "medium";
  width?: number | string;
  placeholder?: string;
};

export const RoleDropdown = (props: TProps): JSX.Element => {
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

  const roleSet: Set<string> = new Set(); // Use a Set to store unique roles

  const roleList: TRole[] = data
    ? data.jdList.reduce((accumulator: TRole[], job: any) => {
        // Check if the role already exists in the Set, if not, add it to the Set and accumulator
        if (!roleSet.has(job.jobRole)) {
          roleSet.add(job.jobRole);
          accumulator.push({ jobRole: job.jobRole });
        }
        return accumulator;
      }, [])
    : [];

  return (
    <Autocomplete
      value={value}
      options={roleList}
      getOptionLabel={(option) => option.jobRole}
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
