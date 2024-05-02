import { useCallback } from "react";
import { Clear, Search } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";

import { Render } from "../Render";

type Props = {
  onSearch: (value: string) => void;
  placeholder?: string;
  label?: string;
  size?: "small" | "medium";
  value?: string;
};

export const SearchBar = (props: Props): JSX.Element => {
  const { onSearch, placeholder, label, size = "small", value } = props;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(event?.target?.value);
    },
    [onSearch]
  );

  const handleClear = useCallback(() => {
    onSearch("");
  }, [onSearch]);

  return (
    <TextField
      variant="outlined"
      label={label}
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
      size={size}
      InputProps={{
        startAdornment: (
          <IconButton size={size}>
            <Search />
          </IconButton>
        ),
        endAdornment: (
          <Render if={!!value}>
            <IconButton onClick={handleClear} size={size}>
              <Clear />
            </IconButton>
          </Render>
        ),
      }}
      InputLabelProps={{
        sx: {
          color: (theme) => theme.palette.text.primary,
        },
      }}
    />
  );
};
