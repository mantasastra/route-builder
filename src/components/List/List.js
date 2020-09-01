import React, { Component } from "react";
import styled from "@emotion/styled";
import { ReactSortable } from "react-sortablejs";

import ListElement from "./ListElement";

const Container = styled.ul`
  padding: 0;
  margin-top: 5rem;
  list-style-type: none;
  overflow: scroll;
`;

class List extends Component {
  render() {
    const { markers, handleSort, handleDelete } = this.props;

    return (
      <Container data-testid="list">
        <ReactSortable
          list={markers}
          setList={(newState) => handleSort(newState)}
        >
          {markers.map((marker) => (
            <ListElement
              key={marker.id}
              waypoint={marker}
              handleDelete={handleDelete}
            />
          ))}
        </ReactSortable>
      </Container>
    );
  }
}

export default List;
