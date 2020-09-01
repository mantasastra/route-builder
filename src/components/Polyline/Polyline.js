import { polyline as LeafletPolyline } from "leaflet";

export const createPolyline = (coordinates, currentId) => {
  const polyline = LeafletPolyline(coordinates, {
    weight: 6,
  });

  polyline.pointsTo = [currentId, currentId + 1];

  return polyline;
};
