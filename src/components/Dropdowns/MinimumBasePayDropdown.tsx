/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, Divider, TextField } from "@mui/material";
import { useCustomQuery } from "@hooks";
import { fetchJobs } from "@api";

type TMinBasePay = {
  minJdSalary: number;
};

type TProps = {
  value?: TMinBasePay | null;
  onChange: (value: TMinBasePay | null) => void;
  variant?: "filled" | "outlined" | "standard";
  size?: "small" | "medium";
  width?: number | string;
  placeholder?: string;
};

export const MinBasePayDropdown = (props: TProps): JSX.Element => {
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

  const minBasePayList: TMinBasePay[] = data
    ? data.jdList.map((job: any) => ({ minJdSalary: job.minJdSalary }))
    : [];

  return (
    <Autocomplete
      value={value}
      options={minBasePayList}
      getOptionLabel={(option) => option?.minJdSalary?.toString()}
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
