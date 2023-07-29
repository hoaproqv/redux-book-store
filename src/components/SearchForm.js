import React from "react";
import { Button, InputAdornment } from "@mui/material";
import { FTextField } from "../form";
import { Search } from "@mui/icons-material";

const SearchForm = () => {
  return (
    <FTextField
      name="searchQuery"
      sx={{ width: 300 }}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Button type="submit" sx={{ padding: 0, minWidth: 30 }}>
              <Search />
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchForm;
