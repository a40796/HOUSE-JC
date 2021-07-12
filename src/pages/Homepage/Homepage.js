import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Main from "../../components/Main";
import About from "../../components/About";
import MainNews from "../../components/MainNews";
import MainEvents from "../../components/MainEvents";

const Root = styled.div`
  position: relative;
  width: 100%;
`;

const ListContainer = styled.div`
  width: 400px;
  height: 400px;
  background-color: pink;
`;

const Homepage = () => {
  return (
    <Root>
      <Main ListContainer={ListContainer} />
      <About />
      <MainNews />
      <MainEvents />
    </Root>
  );
};
export default Homepage;
