import React from "react";
import styled from "@emotion/styled";

import ListElement from "./ListElement";

const Container = styled.ul`
  padding: 0;
  margin-top: 5rem;
  list-style-type: none;
  overflow: scroll;
`;

const List = ({ markers, handleDelete }) => {
  return (
    <Container data-testid="list">
      {markers.map((marker) => (
        <ListElement
          key={marker.id}
          waypoint={marker}
          handleDelete={handleDelete}
        />
      ))}
    </Container>
  );
};

export default List;
