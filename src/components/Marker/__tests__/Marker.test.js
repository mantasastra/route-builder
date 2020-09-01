import { createMarker } from "../Marker";
import { markerMock } from "../../../mocks/MarkerMock";

describe("Marker", () => {
  test("should create a marker", () => {
    const coordinates = { lat: 11.11, lng: 22.22 };

    const marker = createMarker([], coordinates);

    expect(marker).toHaveProperty("id", 1);
    expect(marker).toHaveProperty("name", "Waypoint 1");
    expect(marker).toHaveProperty("coordinates", [11.11, 22.22]);
  });

  test("should create a marker with incremented id", () => {
    const markers = [markerMock(1)];
    const coordinates = { lat: 11.11, lng: 22.22 };

    const marker = createMarker(markers, coordinates);

    expect(marker).toHaveProperty("id", 2);
    expect(marker).toHaveProperty("name", "Waypoint 2");
  });
});
