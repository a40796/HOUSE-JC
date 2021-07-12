import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import firebase from "firebase";
import { firebaseConfig } from "../components/FirebaseKey";
import { useHistory } from "react-router-dom";
import {
  LG_BIGPAD,
  LG_PAD_960,
  MD_PAD,
  SMAILL_PHONE,
} from "../constants/style";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Wrap = styled.div`
  width: 90%;
  margin: 100px auto;
  position: relative;
  background: #ffffff45;
  padding: 20px;
`;

const NewsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
  align-items: center;
  ${LG_PAD_960} {
    flex-direction: column;
  }
`;

const Title = styled(Link)`
  font-size: 1rem;
  color: white;
  background: rgb(236, 153, 147);
  padding: 0.2rem;
  position: absolute;
  z-index: 1;
  top: 7px;
  left: -6px;
  text-decoration: none;
  ${LG_BIGPAD} {
    font-size: 0.8rem;
  }
`;

const New = styled.div``;
const Intro = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateY(-41px);
`;
const Title_new = styled.h4`
  background: #00bcd4;
  padding: 2px;
  color: white;
  font-weight: 200;
  ${LG_BIGPAD} {
    font-size: 0.8rem;
  }
`;
const Img_new = styled.img`
  width: 100%;
  position: relative;
  ${LG_BIGPAD} {
    width: 100%;
    height: 80%;
  }
`;
const Author_new = styled.p`
  &:hover {
    font-size: 20px;
    color: rgb(236, 153, 147);
  }
  ${LG_BIGPAD} {
    font-size: 0.8rem;
  }
`;
const News = ({ item }) => {
  let history = useHistory();
  return (
    <React.Fragment>
      <New
        onClick={() => {
          history.push("/news");
        }}
      >
        <Img_new src={item.imgurl}></Img_new>
        <Intro>
          <Title_new>{item.title}</Title_new>
          <Author_new>{item.author}</Author_new>
        </Intro>
      </New>
    </React.Fragment>
  );
};

const db = firebase.firestore();

const MainNews = () => {
  let history = useHistory();
  const [news, setNews] = useState([]);
  useEffect(() => {
    const news_arr = [];
    db.collection("mainnews")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          news_arr.push(doc.data());
          // console.log(news_arr);
        });
        setNews(news_arr);
      });
  }, []);
  return (
    <React.Fragment>
      <Wrap>
        <Title
        // onClick={() => {
        //   history.push("/news");
        // }}
        >
          news
        </Title>
        <NewsContainer>
          {news.map((item) => {
            return <News key={item.index} item={item} />;
          })}
        </NewsContainer>
      </Wrap>
    </React.Fragment>
  );
};

export default MainNews;
