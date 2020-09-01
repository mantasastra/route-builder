import React from "react";
import { render } from "@testing-library/react";
import MockTheme from "../../../mocks/MockTheme";

import Sidebar from "../Sidebar";

describe("Sidebar", () => {
  test("should render a header", () => {
    const markers = [];
    const handleSort = jest.fn();
    const handleDelete = jest.fn();
    const handleDownload = jest.fn();

    const { getByTestId } = render(
      <MockTheme>
        <Sidebar
          markers={markers}
          handleSort={handleSort}
          handleDelete={handleDelete}
          handleDownload={handleDownload}
        />
      </MockTheme>
    );
    const header = getByTestId("header");

    expect(header).toBeInTheDocument();
    expect(header).toContainHTML("<h1>Route Builder</h1>");
  });
});
