import React, { Component } from "react";
import styled from "@emotion/styled";
import togpx from "togpx";
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
    markerCoordinates: [],
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
        markerCoordinates: [...prevState.markerCoordinates, markerCoordinates],
        currentId: marker.id,
      };
    });

    marker.addTo(route);
  };

  addLines = () => () => {
    const { markerCoordinates, currentId, route } = this.state;

    const polyline = createPolyline(markerCoordinates, currentId);

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

    const lastMarker = markers[markers.length - 1];
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

    // This allows to draw a line from the last marker
    // when one or more end markers are deleted
    if (markerToDelete === lastMarker) {
      this.state.markerCoordinates.pop();
    }

    // Reset lines and coordinates if all markers are deleted
    if (markers.length === 1) {
      this.setState((prevState) => {
        return {
          ...prevState,
          polylines: [],
          markerCoordinates: [],
        };
      });
    }
  };

  handleDownload = () => {
    const { route } = this.state;
    const routeGeoJSON = route.toGeoJSON();
    const routeGPX = togpx(routeGeoJSON);
    const filename = "cross-country-route.gpx";

    // Manipulate DOM to create downloadable link
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8, " + encodeURIComponent(routeGPX)
    );
    element.setAttribute("download", filename);

    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  render() {
    const { markers, route } = this.state;

    return (
      <Container>
        <Sidebar
          markers={markers}
          handleDelete={this.handleDelete}
          handleDownload={this.handleDownload}
        />
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
