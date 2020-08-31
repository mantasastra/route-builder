import React, { Component } from "react";
import styled from "@emotion/styled";

import List from "../List/List";
import Button from "../Button/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  width: 700px;
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.white};
`;

const Header = styled.header`
  padding-bottom: 20px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.lightDark};
`;

class Sidebar extends Component {
  render() {
    const { markers, handleDelete, handleDownload } = this.props;

    return (
      <Container>
        <Header>
          <h1>Route Builder</h1>
        </Header>

        <List markers={markers} handleDelete={handleDelete} />

        <Button handleClick={handleDownload}>Download your Route</Button>
      </Container>
    );
  }
}

export default Sidebar;
