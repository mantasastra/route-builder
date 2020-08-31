import { divIcon, marker as LeafletMarker } from "leaflet";

const MarkerIcon = (waypointCount) =>
  new divIcon({
    className: "marker-icon",
    iconSize: [25, 25],
    html: waypointCount,
  });

export const createMarker = (markers, coordinates) => {
  let id = 1;

  if (markers.length >= 1) {
    id = markers[markers.length - 1].id + 1;
  }

  const marker = LeafletMarker(coordinates, {
    icon: MarkerIcon(id),
  });

  marker.id = id;
  marker.name = `Waypoint ${id}`;

  return marker;
};
