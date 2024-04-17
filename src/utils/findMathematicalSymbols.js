export const findMathematicalSymbols = (tagName, inputValue) => {
  if (!inputValue) return false;
  const mathematicalSymbols = inputValue.match(/[+\-*()^\/]/g);

  return mathematicalSymbols ? mathematicalSymbols.join("") : false;
};
