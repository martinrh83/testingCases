import "@testing-library/jest-dom"; //to make assertions about the DOM more readable

import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});
