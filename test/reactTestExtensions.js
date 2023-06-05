import { act } from "react-dom/test-utils/index";
import ReactDom from "react-dom/client";
import { act } from "react-dom/test-utils";

export let container;

export const initializeReactContainer = () => {
  container = document.createElement("div");
  document.body.replaceChildren(container);
};

export const render = (component) => {
  act(() => {
    ReactDOM.createRoot(container).render(component);
  });
};
