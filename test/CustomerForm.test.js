import React from "react";
import {
  initializeReactContainer,
  render,
  element,
  form,
  field,
  click,
  submit,
  submitButton,
  change,
} from "./reactTestExtensions";

import { CustomerForm } from "../src/CustomerForm";

describe("CustomerForm", () => {
  const blankCustomer = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
  };
  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders a form", () => {
    render(<CustomerForm original={blankCustomer} />);
    expect(form()).not.toBeNull();
  });

  //#region  Parameterize test case by field
  const itRenderAsATextBox = (fieldName) =>
    it("renders as a text box", () => {
      render(
        <CustomerForm original={blankCustomer} />
      );
      expect(field(fieldName)).not.toBeNull();
      expect(field(fieldName).tagName).toEqual(
        "INPUT"
      );
      expect(field(fieldName).type).toEqual("text");
    });

  const itIncludesTheExistingValue = (
    fieldName,
    existing
  ) =>
    it("includes the existing value", () => {
      const customer = { [fieldName]: existing };
      render(<CustomerForm original={customer} />);
      expect(field(fieldName).value).toEqual(
        existing
      );
    });

  const itRendersALabel = (fieldName, text) => {
    it("renders a label for the text box", () => {
      render(
        <CustomerForm original={blankCustomer} />
      );
      const label = element(`label[for=${fieldName}`);
      expect(label).not.toBeNull();
    });

    it(`renders '${text}' as the label content`, () => {
      render(
        <CustomerForm original={blankCustomer} />
      );
      const label = element(
        `label[for=${fieldName}]`
      );
      expect(label).toContainText(text);
    });
  };

  const itAssignsAnIdThatMatchesTheLabelId = (
    fieldName
  ) =>
    it("assigns an id that matches the label id", () => {
      render(
        <CustomerForm original={blankCustomer} />
      );
      expect(field(fieldName).id).toEqual(fieldName);
    });

  const itSubmitsExistingValue = (fieldName, value) =>
    it("saves existing value when submitted", () => {
      expect.hasAssertions();
      const customer = { [fieldName]: value };
      render(
        <CustomerForm
          original={customer}
          onSubmit={(props) =>
            expect(props[fieldName]).toEqual(value)
          }
        />
      );
      const button = element("input[type=submit]");
      click(button);
    });

  const itSaveNewValueWhenSubmitted = (
    fieldName,
    value
  ) =>
    it("saves new value when submitted", () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          original={blankCustomer}
          onSubmit={(props) =>
            expect(props[fieldName]).toEqual(value)
          }
        />
      );
      change(field(fieldName), value);
      click(submitButton());
    });
  //#endregion Parameterize

  describe("first name field", () => {
    itRenderAsATextBox("firstName");
    itIncludesTheExistingValue("firstName", "Ashley");
    itRendersALabel("firstName", "First Name");
    itAssignsAnIdThatMatchesTheLabelId("firstName");
    itSubmitsExistingValue("firstName", "Ashley");
    itSaveNewValueWhenSubmitted("firstName", "Jamie");
  });

  describe("last name field", () => {
    itRenderAsATextBox("lastName");
    itIncludesTheExistingValue("lastName", "Jo");
    itRendersALabel("lastName", "Last Name");
    itAssignsAnIdThatMatchesTheLabelId("lastName");
    itSubmitsExistingValue("lastName", "Jo");
    itSaveNewValueWhenSubmitted("lastName", "Cath");
  });

  describe("phone number field", () => {
    itRenderAsATextBox("phoneNumber");
    itIncludesTheExistingValue(
      "phoneNumber",
      "0123456"
    );
    itRendersALabel("phoneNumber", "Phone Number");
    itAssignsAnIdThatMatchesTheLabelId("phoneNumber");
    itSubmitsExistingValue("phoneNumber", "01234567");
    itSaveNewValueWhenSubmitted(
      "phoneNumber",
      "1122334455"
    );
  });

  it("renders a submit button", () => {
    render(<CustomerForm original={blankCustomer} />);
    expect(submitButton()).not.toBeNull();
  });

  it("prevents the default action when submitting the form", () => {
    render(
      <CustomerForm
        original={blankCustomer}
        onSubmit={() => {}}
      />
    );
    const event = submit(form());
    expect(event.defaultPrevented).toBe(true);
  });
});
