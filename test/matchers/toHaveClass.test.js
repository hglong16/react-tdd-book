import { toHaveClass } from "./toHaveClass";

describe("toHaveClass matcher", () => {
  const stripTerminalColor = (text) =>
    text.replace(/\x1B\[\d+m/g, "");
  it("return pass is true when the className found in the DOM given", () => {
    const domElement = {
      className: "classToFind",
    };
    const result = toHaveClass(
      domElement,
      "classToFind"
    );
    expect(result.pass).toBe(true);
  });

  it("return pass is false when the className not found in the DOM given", () => {
    const domElement = {
      className: "",
    };
    const result = toHaveClass(
      domElement,
      "classToFind"
    );
    expect(result.pass).toBe(false);
  });

  it("returns a message that contains the source line if no match", () => {
    const domElement = { className: "" };
    const result = toHaveClass(
      domElement,
      "classToFind"
    );
    expect(
      stripTerminalColor(result.message())
    ).toContain(
      `expect(element).toHaveClass("classToFind")`
    );
  });

  it("returns a message that contains the source line if negated match", () => {
    const domElement = {
      className: "classToFind",
    };
    const result = toHaveClass(
      domElement,
      "classToFind"
    );
    expect(
      stripTerminalColor(result.message())
    ).toContain(
      `expect(element).not.toHaveClass("classToFind")`
    );
  });

  it("returns a message that contains the actual text", () => {
    const domElement = { className: "classToFind" };
    const result = toHaveClass(
      domElement,
      "classToFind"
    );
    expect(
      stripTerminalColor(result.message())
    ).toContain(`Actual classes: ["classToFind"]`);
  });

  it("returns a message with emtpy array if there are no classes", () => {
    const domElement = { className: "" };
    const result = toHaveClass(
      domElement,
      "classToFind"
    );

    expect(
      stripTerminalColor(result.message())
    ).toContain(`Actual classes: []`);
  });
});
