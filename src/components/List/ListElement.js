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

const ListElement = ({ waypoint, handleDelete }) => {
  const { id, name } = waypoint;

  return (
    <Container>
      <LeftIconContainer>
        <Icon as={ListIcon} />
      </LeftIconContainer>
      <Text>{name}</Text>
      <RightIconContainer>
        <Icon as={DeleteIcon} onClick={() => handleDelete(id)} />
      </RightIconContainer>
    </Container>
  );
};

export default ListElement;
