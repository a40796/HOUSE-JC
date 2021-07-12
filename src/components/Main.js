import React, { useState, useRef, useEffect } from "react";
import logo3 from "../img/logo3.png";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "firebase/firestore";
import firebase from "firebase";
import { firebaseConfig } from "../components/FirebaseKey";
import {
  LG_BIGPAD,
  LG_PAD_960,
  MD_PAD,
  MD_PHONE_,
  SMAILL_PHONE_,
} from "../constants/style";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

const Mainwrapper = styled.div`
  /* width: 100vw; */
  margin: -33px auto 0;
  font-family: Avenir;
  padding-top: 33px;
  opacity: 1;
`;
const MainTop = styled.div`
  margin: 20vh auto 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
`;
const MainLeft = styled.div`
  ${LG_PAD_960} {
    width: 100%;
    text-align: center;
  }
`;
const MainLog = styled.div`
  width: 124px;
  height: 75px;
  ${LG_PAD_960} {
    width: 15%;
    text-align: center;
    margin: 0 auto;
  }
  ${MD_PHONE_} {
    width: 20%;
  }
  ${SMAILL_PHONE_} {
    width: 25%;
  }
`;

const MainFaSearch = styled.div`
  height: 75px;
`;
const MainImg = styled.img`
  width: 100%;
  height: 100%;
  ${LG_BIGPAD} {
    width: 60%;
    height: 50%;
  }
`;
const MainTitle = styled.div`
  width: 500px;
  font-size: 85px;
  font-family: Arial, Helvetica, sans-serif;
  color: #dc7d4e;
  margin-top: 20px;
  font-weight: 600;
  z-index: 3;
  ${LG_BIGPAD} {
    font-size: 60px;
  }
  ${LG_PAD_960} {
    width: auto;
  }
`;
const MainTitleSpan = styled.span`
  color: #036eb8;
`;
const MainSubtitle = styled.div`
  font-size: 22px;
  color: #036eb8;
  ${LG_BIGPAD} {
    font-size: 18px;
  }
`;
const MainSearch = styled.div`
  display: flex;
  height: 20px;
  width: 400px;
  border-bottom: 1px solid #d3d3d3;
  margin-top: 50px;
  ${LG_BIGPAD} {
    width: 300px;
  }
  ${LG_PAD_960} {
    margin: 2rem auto;
  }
`;
const MainInput = styled.input`
  color: #707070;
  border: none;
  width: 350px;
  background-color: #dee3dc00;
  margin-left: 2rem;
  &:hover {
    background-color: #dc7d4e48;
  }
`;
const MainStair = styled.div``;
const StairUl = styled.ul`
  display: flex;
  margin-top: 200px;
  opacity: 1;
  ${LG_PAD_960} {
    display: none;
  }
`;
const StairLi = styled.li`
  font-size: 18px;
  width: 100px;
  height: 30px;
  background-color: #036eb8;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  ${LG_BIGPAD} {
    width: 70px;
    font-size: 12px;
  }
  &:nth-child(2) {
    transform: translateY(-30px);
  }
  &:nth-child(3) {
    transform: translateY(-60px);
    background: linear-gradient(260deg, rgb(255, 120, 84), rgb(255 87 34 / 0%));
  }
  &:nth-child(4) {
    transform: translateY(-90px);
  }
`;
const StairA = styled(Link)`
  color: aliceblue;
  text-decoration: none;
`;
const MainRight = styled.div`
  ${LG_PAD_960} {
    display: none;
  }
`;
const MainRightImg = styled.img`
  width: 100%;
  position: relative;
  ${LG_BIGPAD} {
    /* display: none; */
  }
`;
const MainRightH4 = styled.h4`
  font-size: 1rem;
  margin-left: 0.5em;
  color: #dc7d4e;
  position: relative;
  left: -3rem;
  bottom: 6rem;
  ${LG_BIGPAD} {
    left: 0;
    bottom: 0;
    /* display: none; */
  }
`;
const MainRightP = styled.div`
  width: 40vw;
  margin-left: 0.5em;
  background-color: #eaece9;
  color: #036eb8;
  position: relative;
  left: -3rem;
  bottom: 6rem;
  ${LG_BIGPAD} {
    left: 0;
    bottom: 0;
  }
`;

const Main = () => {
  const [img, setImg] = useState("");
  useEffect(() => {
    db.collection("homepage")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.data().main_imgurl);
          let img = doc.data().main_imgurl;
          setImg(img);
        });
      });
  }, []);
  return (
    <Mainwrapper>
      {/* main begin */}
      <MainTop>
        <MainLeft>
          <MainLog>
            <MainImg src={logo3} alt="logo3" />
          </MainLog>
          <MainTitle>
            HOUSE
            <MainTitleSpan>JC</MainTitleSpan>
          </MainTitle>
          <MainSubtitle>
            Architecture roam in Japan City.
            <br />
            Culture, Soul and Architecture.
          </MainSubtitle>
          {/* <MainSearch>
            <MainFaSearch>
              <FontAwesomeIcon icon={faSearch} />
            </MainFaSearch>
            <MainInput placeholder="search you want to know" />
          </MainSearch> */}
          <MainStair>
            <StairUl>
              <StairLi>
                <StairA to="/news">News</StairA>
              </StairLi>
              <StairLi>
                <StairA to="/events">Events</StairA>
              </StairLi>
              <StairLi></StairLi>
              <StairLi>
                <StairA to="projects">Projects</StairA>
              </StairLi>
            </StairUl>
          </MainStair>
        </MainLeft>
        <MainRight>
          <MainRightImg src={img}></MainRightImg>
          <MainRightH4>House N / Sou Fujimoto</MainRightH4>
          <MainRightP>
            The house itself is comprised of three shells of progressive size
            nested inside one another. The outermost shell covers the entire
            premises, creating a covered, semi-indoor garden. Second shell
            encloses a limited space inside the covered outdoor space. Third
            shell creates a smaller interior space. Residents build their life
            inside this gradation of domain.
          </MainRightP>
        </MainRight>
      </MainTop>
    </Mainwrapper>
  );
};

export default Main;
