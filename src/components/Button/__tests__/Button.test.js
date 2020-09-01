import React from "react";
import { render } from "@testing-library/react";
import MockTheme from "../../../mocks/MockTheme";

import Button from "../Button";

describe("Button", () => {
  test("should render a custom button correctly", () => {
    const { getByTestId } = render(
      <MockTheme>
        <Button />
      </MockTheme>
    );
    const button = getByTestId("custom-button");

    expect(button).toBeInTheDocument();
  });
});
