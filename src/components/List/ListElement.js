import React from "react";
import styled from "@emotion/styled";

import { ReactComponent as ListIcon } from "../../assets/images/list.svg";
import { ReactComponent as DeleteIcon } from "../../assets/images/delete.svg";

const Container = styled.li`
  display: flex;
  padding: 0.5rem;
`;

const LeftIconContainer = styled.div`
  padding-right: 0.5rem;
`;

const RightIconContainer = styled.div`
  margin-left: auto;
`;

const Icon = styled.button`
  width: 20px;
  height: 20px;
  fill: ${({ theme }) => theme.colors.lightDark};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    fill: ${({ theme }) => theme.colors.white};
  }
`;

const Text = styled.p`
  font-weight: bold;
  justify-content: flex-start;
`;

const ListElement = ({
  waypoint,
  markers,
  drag,
  dragOver,
  setDrag,
  setDragOver,
  handleDelete,
  handleSort,
}) => {
  const { id, name } = waypoint;

  return (
    <Container
      data-testid="list-element"
      draggable
      onDragStart={(e) => {
        e.stopPropagation();

        setDrag(id);
      }}
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();

        setDragOver(id);
      }}
      onDrop={(e) => {
        e.stopPropagation();

        // Utilise ES6 to swap array element positions
        [markers[drag - 1], markers[dragOver - 1]] = [
          markers[dragOver - 1],
          markers[drag - 1],
        ];

        handleSort(markers);
      }}
    >
      <LeftIconContainer>
        <Icon data-testid="drag-handler" as={ListIcon} />
      </LeftIconContainer>
      <Text>{name}</Text>
      <RightIconContainer>
        <Icon
          data-testid="delete-button"
          as={DeleteIcon}
          onClick={() => handleDelete(id)}
        />
      </RightIconContainer>
    </Container>
  );
};

export default ListElement;
