import { polyline as LeafletPolyline } from "leaflet";

export const createPolyline = (coordinates, currentId) => {
  if (coordinates.length > 2) {
    coordinates.shift();
  }

  let points = coordinates;

  const polyline = LeafletPolyline(points);
  polyline.pointsTo = [currentId - 1, currentId];

  return polyline;
};
