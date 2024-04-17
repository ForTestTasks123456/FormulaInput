import React, { useState } from "react";
import { useStore } from "../store";
import { useAutocomplete } from "../api";

const FormulaInput = () => {
  const [input, setInput] = useState("");
  const { tags, addTag, removeTag } = useStore();
  const lastInput = input.split(" ").slice(-1)[0];
  const { data: suggestions, isLoading } = useAutocomplete(lastInput);

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && lastInput) {
      addTag(lastInput);
      setInput("");
    }
  };

  return (
    <div>
      {tags.map((tag, index) => (
        <span key={index}>
          {tag.name}
          <button onClick={() => removeTag(index)}>x</button>
        </span>
      ))}
      <input value={input} onChange={handleInput} onKeyDown={handleKeyDown} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {suggestions?.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => {
                addTag(suggestion);
                setInput("");
              }}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormulaInput;
