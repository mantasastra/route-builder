import React, { useState } from "react";
import styled from "@emotion/styled";

import ListElement from "./ListElement";

const Container = styled.ul`
  padding: 0;
  margin-top: 5rem;
  list-style-type: none;
  overflow: scroll;

  @media only screen and (max-width: 800px) {
    margin-top: auto;
    height: 125px;
  }
`;

const List = ({ markers, handleSort, handleDelete }) => {
  const [drag, setDrag] = useState(null);
  const [dragOver, setDragOver] = useState(null);

  return (
    <Container data-testid="list">
      {markers.map((marker) => (
        <ListElement
          key={marker.id}
          waypoint={marker}
          markers={markers}
          drag={drag}
          dragOver={dragOver}
          setDrag={setDrag}
          setDragOver={setDragOver}
          handleDelete={handleDelete}
          handleSort={handleSort}
        />
      ))}
    </Container>
  );
};

export default List;
