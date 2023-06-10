import React from "react";
import {
  initializeReactContainer,
  render,
  field,
  form,
} from "./reactTestExtensions";
import { AppointmentForm } from "../src/AppointmentForm";

describe("AppointmentForm", () => {
  const blankAppointment = {
    service : "",
  }
  beforeEach(() => {
    initializeReactContainer();
  });

  const labelOfAllOptions = (element) =>
    Array.from(
      element.childNodes,
      (node) => node.textContent
    );

  const findOption = (selectBox, textContent) => {
    const options = Array.from(selectBox.childNodes);
    return options.find(
      (option) => option.textContent === textContent
    );
  };

  it("renders a form", () => {
    render(<AppointmentForm original={blankAppointment}/>);
    expect(form()).not.toBeNull();
  });

  describe("service field", () => {
    it("render as a select box", () => {
      render(<AppointmentForm original={blankAppointment} />);
      expect(field("service")).not.toBeNull();
      expect(field("service").tagName).toEqual(
        "SELECT"
      );
    });
    it("has a blank value as the first value", () => {
      render(<AppointmentForm original={blankAppointment}/>);
      const firstOption =
        field("service").childNodes[0];
      expect(firstOption.value).toEqual("");
    });
    it("list all salon service", () => {
      const services = ["Cut", "Blow-dry"];
      render(
        <AppointmentForm
          selectableServices={services}
          original={blankAppointment}
        />
      );
      expect(
        labelOfAllOptions(field("service"))
      ).toEqual(expect.arrayContaining(services));
    });
    it("pre-selects the existing value", () => {
      const services = ["Cut", "Blow-dry"];
      const appointment = { service: "Blow-dry" };
      render(
        <AppointmentForm
          selectableServices={services}
          original={appointment}
        />
      );
      const option = findOption(
        field("service"),
        "Blow-dry"
      );
      expect(option.selected).toBe(true);
    });
  });
  describe("service field", () => {});
  describe("service field", () => {});
});
