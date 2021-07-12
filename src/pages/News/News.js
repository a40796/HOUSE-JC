import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { NewsData } from "../../components/Data";
import firebase from "firebase";
import { Link } from "react-router-dom";
import {
  LG_BIGPAD,
  LG_PAD_960,
  MD_PAD,
  MD_PHONE_,
  SMAILL_PHONE_,
} from "../../constants/style";

const Root = styled.div`
  margin-top: 100px;
  width: 100vw;
  font-family: ProximaNova, sans-serif;
  text-align: center;
  padding-top: 10vh;
  padding-bottom: 10vh;
  background: #c5d5db;
`;
const NewsBigTitle = styled.h1`
  line-height: 1;
  margin: 0px;
  font-family: cursive;
  font-size: 62px;
  font-weight: 300;
  -webkit-letter-spacing: -4px;
  -moz-letter-spacing: -4px;
  -ms-letter-spacing: -4px;
  letter-spacing: -4px;
  color: white;
  margin-right: 12rem;
  ${MD_PAD} {
    font-size: 40px;
  }
  ${MD_PHONE_} {
    font-size: 30px;
  }
  ${SMAILL_PHONE_} {
    font-size: 28px;
    margin-right: 0;
  }
`;
const NewsSubTitle = styled.h2`
  line-height: 1;
  margin: 0px;
  font-family: cursive;
  font-size: 43px;
  font-weight: 200;
  letter-spacing: -4px;
  color: rgb(243, 121, 118);
  ${MD_PAD} {
    font-size: 40px;
  }
  ${MD_PHONE_} {
    font-size: 30px;
  }
  ${SMAILL_PHONE_} {
    font-size: 28px;
  }
`;
const NewsWrapper = styled.div`
  width: 80vw;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-bottom: 10vh;
  ${MD_PAD} {
    width: 70%;
  }
  ${MD_PHONE_} {
    flex-direction: column;
    align-items: center;
  }
`;
const NewCell = styled.div`
  width: 25vw;
  height: 25vw;
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  &:hover {
    background: rgb(211 243 118 / 14%);
  }
  ${MD_PHONE_} {
    width: 50vw;
    height: 50vw;
  }
`;
const NewTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  ${MD_PAD} {
    font-size: 1.2rem;
  }
  &:hover {
    color: #036eb8;
  }
`;
const NewName = styled.div`
  font-weight: 300;
`;
const NewSeeMore = styled(Link)`
  text-decoration: none;
  color: white;
  background: cadetblue;
  padding: 2px;
  margin-top: 5px;
`;
const NewImg = styled.img`
  width: 100%;
  height: 100%;
`;
const NewSort = styled.div`
  background: white;
  transform: translateY(-10px);
  /* position: absolute;
  left: 0;
  top: -29px; */
  padding: 3px;
  ${LG_BIGPAD} {
    top: -57px;
  }
  ${LG_PAD_960} {
    top: -60px;
  }
  ${MD_PAD} {
    top: -56px;
  }
  ${MD_PHONE_} {
    top: -44px;
  }
  ${SMAILL_PHONE_} {
    top: -54px;
  }
`;

const News = () => {
  const [state, setState] = useState([]);
  useEffect(() => {
    function saveEventsInMap(data) {
      setState(data);
    }
    NewsData(saveEventsInMap);
  }, []);
  return (
    <Root>
      <NewsBigTitle>Latest News</NewsBigTitle>
      <NewsSubTitle>We need your inspiration</NewsSubTitle>
      <NewsWrapper>
        {state.map((item) => {
          return (
            <NewCell key={item.id}>
              <NewImg className="newsImg" src={item.img}></NewImg>
              <NewSort>{item.classify}</NewSort>
              <NewTitle>{item.title}</NewTitle>
              <NewName>{item.name}</NewName>
              <NewSeeMore>SEE MORE</NewSeeMore>
            </NewCell>
          );
        })}
      </NewsWrapper>
    </Root>
  );
};

export default News;
