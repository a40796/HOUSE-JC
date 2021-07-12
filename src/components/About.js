import React from "react";
import styled from "styled-components";
import {
  LG_BIGPAD,
  LG_PAD_960,
  MD_PAD,
  MD_PHONE_,
  SMAILL_PHONE_,
} from "../constants/style";

const Root = styled.div`
  width: 90%;
  margin: 0 auto;
  font-family: arial;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const AboutTitle = styled.div`
  height: 44px;
  width: 270px;
  margin-bottom: 30px;
  ${LG_PAD_960} {
    margin: 0 auto;
  }
`;
const AboutTitleH4 = styled.h4`
  font-size: 30px;
  width: 270px;
  height: 30px;
  color: #036eb8;
  font-weight: bold;
  transform: translateY(-15px);
  ${LG_BIGPAD} {
    font-size: 18px;
  }
  ${LG_PAD_960} {
    text-align: center;
  }
`;
const AboutText = styled.div`
  width: 60vw;
  height: 15vh;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 2px 2px 2px 2px #e2e2e2;
  border-radius: 10px;
  ${MD_PAD} {
    width: 100%;
  }
  ${LG_PAD_960} {
    margin: 0 auto;
  }
  ${SMAILL_PHONE_} {
    width: auto;
  }
`;
const AboutP = styled.p`
  font-family: arial;
  font-size: 1em;
  color: #7070708c;
  line-height: 1.6;
  padding: 10px 10px;
  ${LG_BIGPAD} {
    font-size: 0.8em;
  }
`;
const About = () => {
  return (
    <Root>
      <AboutTitle>
        <AboutTitleH4>ABOUT HOUSE JC</AboutTitleH4>
      </AboutTitle>
      <AboutText>
        <AboutP>
          The purpose of the establishment of house jc is to learn about the
          culture of a Japan city through architecture, so we named a house jc .
          On this website, you can view the recent activities and news of
          Japanese architecture.
        </AboutP>
      </AboutText>
    </Root>
  );
};

export default About;
