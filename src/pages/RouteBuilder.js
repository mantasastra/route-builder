import React, { Component } from "react";
import styled from "@emotion/styled";
import togpx from "togpx";
import { featureGroup } from "leaflet";

import { createMarker, MarkerIcon } from "../components/Marker/Marker";
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
    markerCoordinates: [],
    polylines: [],
    shouldUpdatePolyline: false,
  };

  onMapClick = () => (e) => {
    const { markers, route } = this.state;
    const coordinates = e.latlng;
    const markerCoordinates = [coordinates.lat, coordinates.lng];

    const marker = createMarker(markers, coordinates);

    this.setState((prevState) => {
      return {
        ...prevState,
        currentId: marker.id,
        markers: [...prevState.markers, marker],
        markerCoordinates: [...prevState.markerCoordinates, markerCoordinates],
        shouldUpdatePolyline: false,
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
        shouldUpdatePolyline: false,
      };
    });

    polyline.addTo(route);
  };

  handleSort = (rearrangedMarkers) => {
    const { route, currentId, markers, polylines } = this.state;

    polylines.map((polyline) => route.removeLayer(polyline));

    const markerCoordinates = rearrangedMarkers.map(
      (marker) => marker.coordinates
    );

    const polyline = createPolyline(markerCoordinates, currentId);

    route.addLayer(polyline);
    markers.map((marker) => route.removeLayer(marker));

    let id = 1;
    this.setState((prevState) => {
      return {
        ...prevState,
        markers: rearrangedMarkers.map((marker) => {
          marker.id = id;
          marker.name = `Waypoint ${id}`;
          marker.options.icon = MarkerIcon(id);

          marker.addTo(route);

          id = id + 1;
          return marker;
        }),
        markerCoordinates: markerCoordinates,
        polylines: [polyline],
        shouldUpdatePolyline: false,
      };
    });
  };

  handleDelete = (id) => {
    const { markers, polylines, route } = this.state;

    const lastMarker = markers[markers.length - 1];
    const markerToDelete = markers.find((marker) => marker.id === id);

    // Remove from the Map
    route.removeLayer(markerToDelete);

    polylines.map((polyline) => route.removeLayer(polyline));

    // Remove from state
    this.setState((prevState) => {
      return {
        ...prevState,
        markers: prevState.markers.filter((marker) => marker.id !== id),
        markerCoordinates: prevState.markerCoordinates.filter(
          (_, index) => index + 1 !== id
        ),
        polylines: [],
        shouldUpdatePolyline: true,
      };
    });

    this.updateMarkers();

    // This allows to draw a line from the last marker to the next
    // when one or more end markers are deleted from the list
    if (markerToDelete === lastMarker) {
      this.state.markerCoordinates.pop();
    }

    // Reset lines and coordinates if all markers are deleted
    if (markers.length === 1) {
      this.resetState();
    }
  };

  handleDownload = () => {
    const { route } = this.state;
    const routeGeoJSON = route.toGeoJSON();
    const routeGPX = togpx(routeGeoJSON);
    const filename = "cross-country-route.gpx";

    // Manipulate DOM to create downloadable link
    const downloadLink = document.createElement("a");
    downloadLink.setAttribute(
      "href",
      "data:text/plain;charset=utf-8, " + encodeURIComponent(routeGPX)
    );
    downloadLink.setAttribute("download", filename);

    document.body.appendChild(downloadLink);

    downloadLink.click();

    document.body.removeChild(downloadLink);
  };

  updateMarkers = () => {
    const { markers, route } = this.state;

    markers.map((marker) => route.removeLayer(marker));

    let id = 1;
    this.setState((prevState) => {
      return {
        ...prevState,
        markers: prevState.markers.map((marker) => {
          marker.id = id;
          marker.name = `Waypoint ${id}`;
          marker.options.icon = MarkerIcon(id);

          marker.addTo(route);

          id = id + 1;
          return marker;
        }),
      };
    });
  };

  resetState = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        currentId: null,
        markers: [],
        markerCoordinates: [],
        polylines: [],
        shouldUpdatePolyline: false,
      };
    });
  };

  componentDidUpdate() {
    const {
      route,
      currentId,
      markerCoordinates,
      polylines,
      shouldUpdatePolyline,
    } = this.state;

    if (shouldUpdatePolyline) {
      polylines.map((polyline) => route.removeLayer(polyline));

      const polyline = createPolyline(markerCoordinates, currentId);

      route.addLayer(polyline);

      polylines.push(polyline);
    }
  }

  render() {
    const { markers, route } = this.state;

    return (
      <Container>
        <Sidebar
          markers={markers}
          handleSort={this.handleSort}
          handleDelete={this.handleDelete}
          handleDownload={this.handleDownload}
        />
        <Map
          onMapClick={this.onMapClick}
          addLines={this.addLines}
          route={route}
        />
      </Container>
    );
  }
}

export default RouteBuilder;
