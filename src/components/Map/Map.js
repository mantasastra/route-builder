import React, { useEffect } from "react";
import styled from "@emotion/styled";
import L from "leaflet";

const Container = styled.div`
  width: 100%;
`;

const Map = () => {
  const mapRef = React.useRef(null);

  useEffect(() => {
    mapRef.current = L.map("map", {
      minZoom: 12,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    }).locate({ setView: true, maxZoom: 18 });
  }, []);

  return <Container id="map"></Container>;
};

export default Map;
