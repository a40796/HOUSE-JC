import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import styled from "styled-components";
import logo3 from "../img/logo3.png";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import {
  LG_BIGPAD,
  LG_PAD_960,
  MD_PAD,
  MD_PHONE_,
  SMAILL_PHONE_,
} from "../constants/style";

const FooterCotainer = styled.div`
  height: 180px;
  border-top: 1px solid #7070709c;
  background: #eaece9;
  font-family: arial;
  ${(props) => props.$bgcNews && `background: #c5d5db;`};
  ${(props) => props.$bgcEvents && `background: rgb(243, 244, 245);`};
  ${(props) => props.$bgcProjects && `background: rgb(255, 255, 255);`};
`;

const FooterWrapper = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  font-family: ProximaNova, sans-serif;
  display: flex;
  justify-content: space-between;
`;
const FooterLeft = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FooterImg = styled.img`
  width: 20%;
  ${LG_BIGPAD} {
    width: 30%;
  }
  ${LG_PAD_960} {
    width: 30%;
  }
  ${MD_PHONE_} {
    width: 40%;
  }
  ${SMAILL_PHONE_} {
    width: 50%;
    margin-left: 30%;
  }
`;
const FooterLogo = styled.div`
  font-family: arial;
  /* color: gray; */
  font-size: 20px;
  font-weight: 100;
  letter-spacing: -1.5px;
  line-height: 1.24;
  margin-top: 20px;
  font-family: arial;

  ${MD_PAD} {
    font-size: 12px;
  }
`;
const FooterUl = styled.ul`
  list-style-type: none;
  font-size: 1rem;
  font-weight: 600;
  ${LG_BIGPAD} {
    font-size: 0.8rem;
  }
`;
const FooterLi = styled.li`
  font-size: 0.8rem;
  font-weight: 200;
  &:hover {
    color: rgb(243, 121, 118);
  }
`;
const FooterSlogan = styled.span``;

const FooterRight = styled.div`
  width: 30%;
  height: 100%;
  ${LG_PAD_960} {
    width: 35%;
  }
  ${SMAILL_PHONE_} {
    width: 40%;
  }
`;
const Decro = styled.span`
  width: 1px;
  height: 80%;
  border-right: 0.1px solid #80808052;
  margin: auto 0;
`;
const Media = styled.div`
  font-size: 1.5rem;

  ${MD_PHONE_} {
    margin-top: -20px;
  }
`;

const FooterRightText = styled.span`
  font-size: 0.5rem;
`;

function Footer() {
  const location = useLocation();
  let history = useHistory();
  return (
    <FooterCotainer
      $bgcNews={location.pathname === "/news"}
      $bgcEvents={location.pathname === "/events"}
      $bgcProjects={location.pathname === "/boards"}
    >
      <FooterWrapper>
        <FooterLeft>
          <FooterImg src={logo3} alt="logo3"></FooterImg>
          {/* <FooterLogo>HOUSE JC</FooterLogo> */}
          <FooterUl>
            Browse on HOUSE JC
            <FooterLi
              onClick={() => {
                history.push("/news");
              }}
            >
              news
            </FooterLi>
            <FooterLi
              onClick={() => {
                history.push("/events");
              }}
            >
              events
            </FooterLi>
            <FooterLi
              onClick={() => {
                history.push("/boards");
              }}
            >
              boards
            </FooterLi>
          </FooterUl>
        </FooterLeft>
        <Decro></Decro>
        <FooterRight>
          <h4>About Us</h4>
          <Media>
            <FaFacebookSquare />
            <FaInstagramSquare />
          </Media>
          <FooterRightText>
            Culture, Soul and Architecture | House jc
            <br />© All rights reserved. House jc since 2020.
          </FooterRightText>
        </FooterRight>
      </FooterWrapper>
    </FooterCotainer>
  );
}

export default Footer;
