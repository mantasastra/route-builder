import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import L from "leaflet";

const Container = styled.div`
  width: 100%;

  .marker-icon {
    text-align: center;
    padding-top: 2px;
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.dark};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 12px;
  }
`;

const MarkerIcon = (waypointCount) =>
  new L.divIcon({
    className: "marker-icon",
    iconSize: [25, 25],
    html: waypointCount,
  });

const Map = () => {
  let mapContainer;
  const [waypoints, addWaypoint] = useState([]);

  useEffect(() => {
    const map = L.map(mapContainer, {
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    }).locate({ setView: true, maxZoom: 16 });

    map.on("click", (e) => {
      const marker = L.marker(e.latlng, {
        icon: MarkerIcon(1),
        draggable: true,
      }).addTo(map);

      addWaypoint((prevState) => [
        ...prevState,
        {
          id: 1,
          coordinates: marker.getLatLng(),
        },
      ]);
    });
  }, [mapContainer]);
  console.log(waypoints);
  return <Container ref={(el) => (mapContainer = el)}></Container>;
};

export default Map;
