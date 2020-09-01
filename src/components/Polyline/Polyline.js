import { polyline as LeafletPolyline } from "leaflet";

export const createPolyline = (coordinates) => {
  const polyline = LeafletPolyline(coordinates, {
    weight: 6,
  });

  polyline.type = "Polyline";

  return polyline;
};
