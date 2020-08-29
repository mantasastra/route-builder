import React from "react";
import styled from "@emotion/styled";

import ListElement from "./ListElement";

const Container = styled.ul`
  padding: 0;
  margin-top: 5rem;
  list-style-type: none;
`;

const List = () => {
  const list = ["Waypoint 1", "Waypoint 2", "Waypoint 3", "Waypoint 4"];
  return (
    <Container>
      {list.map((el) => (
        <ListElement key={el} text={el} />
      ))}
    </Container>
  );
};

export default List;
