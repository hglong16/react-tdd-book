import {
  matcherHint,
  printExpected,
  printReceived,
} from "../../node_modules/jest-matcher-utils/build/index";

export const toHaveClass = (
  received,
  expectedClass
) => {
  const pass =
    received.className.includes(expectedClass);

  const sourceHint = () =>
    matcherHint(
      "toHaveClass",
      "element",
      printExpected(expectedClass),
      { isNot: pass }
    );
  const actualTextHint = () =>
    received.className === ""
      ? "Actual classes: " + printReceived([])
      : "Actual classes: " +
        printReceived(received.className.split(" "));

  const message = () =>
    [sourceHint(), actualTextHint()].join("\n\n");
  return {
    pass,
    message,
  };
};
