import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import firebase from "firebase";
import { firebaseConfig } from "../components/FirebaseKey";
import {
  LG_BIGPAD,
  LG_PAD_960,
  MD_PAD,
  SMAILL_PHONE,
} from "../constants/style";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

const Root = styled.div`
  width: 90%;
  margin-top: 150px;
  margin: 150px auto;
  height: 600px;
  display: flex;
  justify-content: space-between;
  position: relative;
`;
const MainEventsLeft = styled.div`
  width: 1200px;
  height: 600px;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const MainEventsMark = styled.div`
  font-size: 1.5rem;
  color: #036eb8;
  margin-left: 55px;
  /* transform: translateX(2.5em); */
  ${LG_BIGPAD} {
    font-size: 2em;
  }
`;
const MainEventsLeftH2 = styled(Link)`
  font-size: 1rem;
  color: white;
  background: rgb(236, 153, 147);
  padding: 0.2rem;
  position: absolute;
  top: 7px;
  left: -6px;
  z-index: 1;
  text-decoration: none;
  ${LG_BIGPAD} {
    font-size: 0.8rem;
  }
  &:hover {
    color: #dc7d4e;
  }
`;
const MainEventsLeftP = styled(Link)`
  font-size: 22px;
  width: 55%;
  background: rgba(253, 251, 251, 0.6);
  margin-bottom: 10px;
  margin-left: 58px;
  color: #dc7d4e;
  text-decoration: none;
  display: block;
  ${LG_BIGPAD} {
    font-size: 1rem;
  }
  &:hover {
    color: #036eb8;
  }
`;
const MainEventsRight = styled.div`
  width: 600px;
  height: 600px;
  background-image: linear-gradient(to right, #e6bbaa, #7ed7ef);
  margin-left: 5px;
  color: #036db870;
  display: flex;
  justify-content: center;
  align-items: center;
  ${LG_BIGPAD} {
    font-size: 0.8rem;
  }
  ${LG_PAD_960} {
    display: none;
  }
`;
const MainEventsRightSpan = styled.div`
  width: 7vw;
  height: 7vh;
  font-size: 1em;
  background-color: #036eb8;
  margin-left: 0.5em;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const MainEvents = () => {
  const [img, setImg] = useState("");
  useEffect(() => {
    db.collection("mainEvents")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.data().imgUrl);
          let img = doc.data().imgUrl;
          setImg(img);
        });
      });
  }, []);

  return (
    <Root>
      <MainEventsLeft img={img}>
        <MainEventsLeftH2 to="/events">Events</MainEventsLeftH2>
        <MainEventsMark>Worthy of your attention</MainEventsMark>
        <MainEventsLeftP to="/events">
          TRAVEL WITH ARCHITECTURE IN TOKYO.2021/01/11~2021/01/16
        </MainEventsLeftP>
        <MainEventsLeftP to="/events">
          TRAVEL WITH ARCHITECTURE IN OSAKA.2020/12/11~2020/12/15
        </MainEventsLeftP>
      </MainEventsLeft>
      <MainEventsRight>
        follow your soul with
        <MainEventsRightSpan>HOUSE JC.</MainEventsRightSpan>
      </MainEventsRight>
    </Root>
  );
};

export default MainEvents;
