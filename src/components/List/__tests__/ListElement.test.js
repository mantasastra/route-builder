import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MockTheme from "../../../mocks/MockTheme";
import { markerMock } from "../../../mocks/MarkerMock";

import ListElement from "../ListElement";

describe("List", () => {
  test("should render list element", () => {
    const handleDelete = jest.fn();

    const { getByTestId } = render(
      <MockTheme>
        <ListElement waypoint={markerMock(1)} handleDelete={handleDelete} />
      </MockTheme>
    );

    const listElement = getByTestId("list-element");
    const dragHandler = getByTestId("drag-handler");
    const deleteButton = getByTestId("delete-button");

    expect(listElement).toBeInTheDocument();
    expect(listElement).toContainElement(dragHandler);
    expect(listElement).toContainElement(deleteButton);
  });

  test("should click delete button", () => {
    const handleDelete = jest.fn();

    const { getByTestId } = render(
      <MockTheme>
        <ListElement waypoint={markerMock(1)} handleDelete={handleDelete} />
      </MockTheme>
    );

    const deleteButton = getByTestId("delete-button");

    fireEvent.click(deleteButton);

    expect(handleDelete).toHaveBeenCalled();
  });
});
