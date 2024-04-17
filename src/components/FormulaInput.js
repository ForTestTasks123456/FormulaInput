import React, { useState } from "react";
import { useStore } from "../store";
import { useAutocomplete } from "../api";
import {
  TextField,
  List,
  ListItem,
  IconButton,
  Stack,
  Box,
  Autocomplete,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const FormulaInput = () => {
  const [inputValue, setInputValue] = useState("");
  const { tags, addTag, removeTag } = useStore();
  const lastInput = inputValue
    .split(" ")
    .slice(-1)[0]
    .trim()
    .replace(/[^a-zA-Z0-9а-яА-ЯёЁ]/g, "");
  const { data: suggestions } = useAutocomplete(lastInput);

  const handleInputChange = (event, newInputValue, reason) => {
    if (reason === "input") {
      // Убедитесь, что обновление состояния происходит только при вводе пользователя
      setInputValue(newInputValue);
    }
  };

  const handleSelect = (event, newValue) => {
    if (newValue && !tags.find((tag) => tag.id === newValue.id)) {
      addTag(newValue);
    }
  };

  const handleDelete = (tagToDelete) => () => {
    removeTag(tagToDelete.id);
  };

  const filterOptions = (options, state) => options;

  return (
    <Box sx={{ padding: "20px" }}>
      <Autocomplete
        freeSolo
        multiple
        value={tags}
        onChange={handleSelect}
        open={true}
        onInputChange={handleInputChange}
        options={suggestions || []}
        getOptionLabel={(option) => option.name}
        filterOptions={filterOptions}
        renderTags={(tagValue, getTagProps) => {
          return tagValue.map((option, index) => {
            return (
              <Chip
                key={index}
                label={option.name}
                onDelete={handleDelete(option)}
                {...getTagProps({ index })}
              />
            );
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Input Formula"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </Box>
  );
};
export default FormulaInput;
