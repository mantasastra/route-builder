import { polyline as LeafletPolyline } from "leaflet";

export const createPolyline = (coordinates, currentId) => {
  let points = [...coordinates];

  if (points.length > 2) {
    points.shift();
  }

  const polyline = LeafletPolyline(points);
  polyline.pointsTo = [currentId - 1, currentId];

  return polyline;
};
