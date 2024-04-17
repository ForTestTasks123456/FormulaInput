import React from "react";
import { useStore } from "../store/store";
import { useAutocomplete } from "../api/api";
import { TextField, Box, Autocomplete, Chip, Typography } from "@mui/material";
import { typeTagMath } from "../constants/constants";
import { findMathematicalSymbols, evaluateExpression } from "../utils/index";

const FormulaInput = () => {
  const { tags, addTag, removeTag, inputValue, setInputValue } = useStore();

  const { data: suggestions } = useAutocomplete();

  const handleInputChange = (event, newInputValue, reason) => {
    if (reason === "input") {
      setInputValue(newInputValue);
    }
  };

  const handleSelect = (event, newValue) => {
    if (newValue) {
      const newTag = newValue[newValue.length - 1];
      const mathematicalSymbols = findMathematicalSymbols(
        newTag?.name,
        inputValue
      );
      setInputValue("");
      let updatedTags;
      if (mathematicalSymbols) {
        updatedTags = [
          ...newValue.slice(0, newValue.length - 1),
          {
            name: mathematicalSymbols,
            value: mathematicalSymbols,
            type: typeTagMath,
            id: newTag?.id,
          },
          newValue[newValue.length - 1],
        ];
      } else {
        updatedTags = [...newValue];
      }

      addTag(updatedTags);
    }
  };
  const handleDelete = (tagToDelete) => () => {
    removeTag(tagToDelete.id);
  };
  const result = evaluateExpression(tags?.map((e) => e.value));
  const filterOptions = (options, state) => options;
  return (
    <Box sx={{ padding: "20px" }}>
      <Autocomplete
        freeSolo
        multiple
        value={tags}
        onChange={handleSelect}
        onInputChange={handleInputChange}
        options={suggestions || []}
        getOptionLabel={(option) => option.name}
        filterOptions={filterOptions}
        renderTags={(tagValue, getTagProps) => {
          return tagValue.map((option, index) => {
            if (option?.type === typeTagMath) {
              return <span key={option.id + index}>{option.name}</span>;
            }
            if (option.name) {
              return (
                <Chip
                  key={option.id}
                  label={option.name}
                  onDelete={handleDelete(option)}
                />
              );
            }
          });
        }}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" fullWidth />
        )}
      />
      {result && <Typography pt={10}>result:{result}</Typography>}
    </Box>
  );
};
export default FormulaInput;
