import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import React from "react";
import { Appointment } from "../src/Appointment";

describe("Appointment", () => {
  it("render the customer first name", () => {
    const customer = { firstName: "Ashley" };
    const component = <Appointment customer={customer} />;
    const container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.createRoot(container).render(component);
    });
    expect(document.body.textContent).toContain("Ashley");
  });
});
