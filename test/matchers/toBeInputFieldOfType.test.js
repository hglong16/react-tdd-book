import { toBeInputFieldOfType } from "./toBeInputFieldOfType";

describe("toBeInputFieldOfType matcher", () => {
  const stripTerminalColor = (text) =>
    text.replace(/\x1B\[\d+m/g, "");

  const elementFrom = (text) => {
    const parent = document.createElement("div");
    parent.innerHTML = text;
    return parent.firstChild;
  };
  it("return pass is true when input element of the right type is found", () => {
    const domElement = elementFrom(
      "<input type=text />"
    );
    const result = toBeInputFieldOfType(
      domElement,
      "text"
    );
    expect(result.pass).toBe(true);
  });

  it("returns pass is false when the element is null", () => {
    const result = toBeInputFieldOfType(null, "text");
    expect(result.pass).toBe(false);
  });

  it("returns pass is false when the tag name is not INPUT", () => {
    const domElement = elementFrom(
      "<p  type=text />"
    );
    const result = toBeInputFieldOfType(
      domElement,
      "text"
    );
    expect(result.pass).toBe(false);
  });

  it("return pass is false when the element is wrong type", () => {
    const domElement = elementFrom(
      "<input type=tel />"
    );
    const result = toBeInputFieldOfType(
      domElement,
      "text"
    );
    expect(result.pass).toBe(false);
  });

  it("return a message that contains the source line if no match", () => {
    const domElement = elementFrom(
      "<input type=date />"
    );
    const result = toBeInputFieldOfType(
      domElement,
      "text"
    );
    expect(
      stripTerminalColor(result.message())
    ).toMatch(
      `expect(element).toBeInputFieldOfType("text")`
    );
  });
  it("returns a message that contains the source line if negated match", () => {
    const domElement = elementFrom(
      "<input type=text />"
    );
    const result = toBeInputFieldOfType(
      domElement,
      "text"
    );
    expect(
      stripTerminalColor(result.message())
    ).toMatch(
      `expect(element).not.toBeInputFieldOfType("text")`
    );
  });
  it("return a specific message the element pass is null", () => {
    const result = toBeInputFieldOfType(null, "text");
    expect(
      stripTerminalColor(result.message())
    ).toMatch(`Actual: element was not found`);
  });
  it("return a message when the input element has the wrong tag", () => {
    const domElement = elementFrom("<p />");
    const result = toBeInputFieldOfType(
      domElement,
      "text"
    );
    expect(
      stripTerminalColor(result.message())
    ).toMatch(`Actual: <p>`);
  });
  it("return a message when the input element has the wrong type", () => {
    const domElement = elementFrom(
      "<input type=date />"
    );
    const result = toBeInputFieldOfType(
      domElement,
      "text"
    );
    expect(
      stripTerminalColor(result.message())
    ).toMatch(`Actual: <input type=date>`);
  });
});
