import { createPolyline } from "../Polyline";

describe("Polyline", () => {
  test("should create a polyline", () => {
    const coordinates = [[11.11, 22.22]];
    const currentId = 1;

    const polyline = createPolyline(coordinates, currentId);

    expect(polyline).toHaveProperty("type", "Polyline");
  });
});
