import React, { Component } from "react";
import { Map as LeafletMap, tileLayer } from "leaflet";
import styled from "@emotion/styled";

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

class Map extends Component {
  constructor(props) {
    super(props);

    this.mapContainer = null;
  }

  createLeafletElement() {
    return new LeafletMap(this.mapContainer, {
      layers: [
        tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    }).locate({ setView: true, maxZoom: 16 });
  }

  componentDidMount() {
    this.leafletElement = this.createLeafletElement();

    this.leafletElement.addLayer(this.props.route);

    this.leafletElement.on("click", this.props.addMarkers());
    this.leafletElement.on("click", this.props.addLines());
  }

  componentWillUnmount() {
    this.leafletElement.off("click", this.props.addMarkers());
    this.leafletElement.off("click", this.props.addLines());
  }

  render() {
    return (
      <Container ref={(el) => (this.mapContainer = el)}>
        {this.props.children}
      </Container>
    );
  }
}

export default Map;
