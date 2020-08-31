import React, { Component } from "react";
import styled from "@emotion/styled";
import { featureGroup } from "leaflet";
import { createMarker } from "../components/Marker/Marker";
import { createPolyline } from "../components/Polyline/Polyline";
import Sidebar from "../components/Sidebar/Sidebar";
import Map from "../components/Map/Map";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

class RouteBuilder extends Component {
  state = {
    route: new featureGroup(),
    currentId: null,
    markers: [],
    polylines: [],
    coordinates: [],
  };

  onMapClick = () => (e) => {
    const { markers, route } = this.state;
    const coordinates = e.latlng;
    const markerCoordinates = [coordinates.lat, coordinates.lng];

    const marker = createMarker(markers, coordinates);

    this.setState((prevState) => {
      return {
        ...prevState,
        markers: [...prevState.markers, marker],
        coordinates: [...prevState.coordinates, markerCoordinates],
        currentId: marker.id,
      };
    });

    marker.addTo(route);
  };

  addLines = () => () => {
    const { coordinates, currentId, route } = this.state;

    const polyline = createPolyline(coordinates, currentId);

    this.setState((prevState) => {
      return {
        ...prevState,
        polylines: [...prevState.polylines, polyline],
      };
    });

    polyline.addTo(route);
  };

  handleDelete = (id) => {
    const { markers, polylines, route } = this.state;

    const markerToDelete = markers.find((marker) => marker.id === id);
    const polylinesToDelete = polylines.map((polyline) =>
      polyline.pointsTo.includes(id) ? polyline : null
    );

    // Remove from Map
    route.removeLayer(markerToDelete);
    polylinesToDelete.map((polyline) => route.removeLayer(polyline));

    // Remove from state
    this.setState((prevState) => {
      return {
        ...prevState,
        markers: prevState.markers.filter((marker) => marker.id !== id),
        polylines: prevState.polylines.filter((polyline) => {
          if (!polylinesToDelete.includes(polyline)) {
            return polyline;
          }
        }),
      };
    });

    if (markers.length === 1) {
      this.setState((prevState) => {
        return {
          ...prevState,
          polylines: [],
          coordinates: [],
        };
      });
    }
  };

  render() {
    const { markers, route } = this.state;

    return (
      <Container>
        <Sidebar markers={markers} handleDelete={this.handleDelete} />
        <Map
          onMapClick={this.onMapClick}
          addLines={this.addLines}
          markers={markers}
          route={route}
        />
      </Container>
    );
  }
}

export default RouteBuilder;
