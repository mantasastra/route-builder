import React from "react";
import { render } from "@testing-library/react";
import MockTheme from "../../../mocks/MockTheme";
import { markerMock } from "../../../mocks/MarkerMock";

import List from "../List";

describe("List", () => {
  test("should render a list with list elements", () => {
    const markers = [markerMock(1)];
    const handleDelete = jest.fn();

    const { getByTestId } = render(
      <MockTheme>
        <List markers={markers} handleDelete={handleDelete} />
      </MockTheme>
    );
    const list = getByTestId("list");
    const listElement = getByTestId("list-element");

    expect(list).toBeInTheDocument();
    expect(list).toContainElement(listElement);
  });

  test("should render a list with multiple list elements", () => {
    const markers = [markerMock(1), markerMock(2), markerMock(3)];
    const handleDelete = jest.fn();

    const { getByText } = render(
      <MockTheme>
        <List markers={markers} handleDelete={handleDelete} />
      </MockTheme>
    );

    expect(getByText("Waypoint 1")).toBeVisible();
    expect(getByText("Waypoint 2")).toBeVisible();
    expect(getByText("Waypoint 3")).toBeVisible();
  });
});
