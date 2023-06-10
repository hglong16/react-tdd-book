import {
  matcherHint,
  printExpected,
  printReceived,
} from "jest-matcher-utils";

export const toBeInputFieldOfType = (
  received,
  expectedType
) => {
  const pass =
    received?.tagName === "INPUT" &&
    received.type === expectedType;

  const sourceHint = () =>
    matcherHint(
      "toBeInputFieldOfType",
      "element",
      printExpected(expectedType),
      {isNot: pass}
    );

  const actualHint = () => {
    if(!received) return "element was not found"
    if(received?.tagName !== "INPUT") {
      return `<${received?.tagName.toLowerCase()}>`
    }
    return `<input type=${received.type}>`
  }
  const message = () => [sourceHint(),"Actual: " + actualHint()].join("\n\n")
  return {
    pass, message
  };
};
