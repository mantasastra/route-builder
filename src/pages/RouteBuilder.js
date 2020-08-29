import React from "react";
import styled from "@emotion/styled";

import Sidebar from "../components/Sidebar/Sidebar";
import Map from "../components/Map/Map";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const RouteBuilder = () => {
  return (
    <Container>
      <Sidebar />
      <Map />
    </Container>
  );
};

export default RouteBuilder;
