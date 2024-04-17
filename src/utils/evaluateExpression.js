import { evaluate } from "mathjs";

export const evaluateExpression = (expressionArray) => {
  if (!expressionArray) return;
  const expression = expressionArray.join("");
  try {
    const result = evaluate(expression);
    return result;
  } catch (error) {
    return `Error evaluating expression: ${error.message}`;
  }
};
