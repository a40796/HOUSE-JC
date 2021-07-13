import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import "../styles/app.css";
import "firebase/firestore";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import {
  LG_BIGPAD,
  LG_PAD_960,
  MD_PAD,
  MD_PHONE_,
  SMAILL_PHONE_,
} from "../constants/style";

const db = firebase.firestore();

const Header = styled.div`
  background: #eaece9;
  ${(props) => props.$bgcNews && `background: #c5d5db;`};
  ${(props) => props.$bgcEvents && `background: rgb(243, 244, 245);`};
  ${(props) => props.$bgcProjects && `background: rgb(255, 255, 255);`};
  width: 100%;
  height: 100px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  border-bottom: 1px solid #7070709c;
  z-index: 3;

  ${LG_BIGPAD} {
  }
`;
const Top = styled.div`
  padding: 0 10vh 0 10vh;
  height: 100px;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  border-bottom: 1px solid #7070709c;
  ${MD_PHONE_} {
    padding: 0 10px 0 10px;
  }
  ${SMAILL_PHONE_} {
  }
`;
const Left = styled.div`
  display: flex;
  align-items: center;
`;
const Bt = styled.button`
  border: none;
  font-size: 2rem;
  background: none;
`;
const Logo = styled(Link)`
  width: 8vw;
  margin-left: 2rem;
  text-decoration: none;
  color: black;
  font-family: arial black;
  letter-spacing: 3px;
  &:hover {
    color: rgb(243, 121, 118);
  }
  ${LG_BIGPAD} {
    width: 20vw;
  }
  ${MD_PHONE_} {
    width: 30vw;
  }
  ${SMAILL_PHONE_} {
    margin-left: 10px;
  }
`;
const Center = styled.div``;
const CenterUl = styled.ul`
  height: 100px;
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  opacity: 1;
  ${LG_BIGPAD} {
    display: none;
  }
`;
const CenterLi = styled(Link)`
  color: black;
  text-decoration: none;
  ${(props) =>
    props.$active &&
    `
       color: rgb(243,121,118);
      `}
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  font-size: 22px;
  font-family: ProximaNova, sans-serif;
  ${LG_BIGPAD} {
    /* display: none; */
  }
  ${LG_PAD_960} {
  }
  ${MD_PAD} {
    font-size: 16px;
    margin-right: 20px;
  }
  ${MD_PHONE_} {
    margin-right: 0;
  }
`;
const Login = styled(Link)`
  color: black;
  text-decoration: none;
  ${MD_PAD} {
    font-size: 16px;
  }

  ${(props) =>
    props.$active &&
    `
       color: rgb(243,121,118);
      `}
`;
const Signup = styled(Link)`
  text-decoration: none;
  margin-left: 20px;
  background: linear-gradient(
    260deg,
    rgb(84 177 255 / 44%),
    rgb(255 87 34 / 0%)
  );
  color: #7aa7ad;
  border-radius: 3px;
  ${MD_PAD} {
    font-size: 16px;
  }

  ${(props) =>
    props.$active &&
    `
       color: rgb(243,121,118);
      `}
`;

const Nav = ({
  handlePanel,
  buttonRef,
  bgc,
  handleLogin,
  handleSignUP,
  shopCartBtn,
  setShopCartBtn,
}) => {
  let history = useHistory();
  let email = localStorage.getItem("userEmail");
  let name = localStorage.getItem("username");

  // 將登入後使用者資訊從firebase中拿出定義
  db.collection("members")
    .where("name", "==", name)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.data().name);
        let loginName = doc.data().name;
        document.querySelector(".memberBtn").innerHTML = `hi,${loginName}`;
      });
    });

  const location = useLocation();

  const [loginBtn, setLoginBtn] = useState({
    state: true,
    text: "Log in",
    email: email,
  });
  const [signUpBtn, setsignUpBtn] = useState({
    state: true,
    text: "Sign Up",
    email: email,
  });
  const [memberBtn, setMemberBtn] = useState({
    state: true,
    text: `hi,${name}`,
    email: email,
    name: name,
  });
  useEffect(() => {
    setMemberBtn(name);
  }, [memberBtn]);
  const handleMember = () => {
    history.push("/member");
  };
  const handleshopCart = () => {
    history.push("/shopcart");
  };

  return (
    <Header
      bgc={bgc}
      $bgcNews={location.pathname === "/news"}
      $bgcEvents={location.pathname === "/events"}
      $bgcProjects={location.pathname === "/boards"}
    >
      <Top>
        <Left>
          <Bt onClick={handlePanel}>
            <div ref={buttonRef}>
              <FontAwesomeIcon className="faBars" icon={faBars} />
            </div>
          </Bt>
          <Logo to="/">HOUSE JC</Logo>
        </Left>
        <Center>
          <CenterUl>
            <CenterLi to="/news" $active={location.pathname === "/news"}>
              News
            </CenterLi>
            <CenterLi to="/events" $active={location.pathname === "/events"}>
              Events
            </CenterLi>
            <CenterLi to="/boards" $active={location.pathname === "/boards"}>
              Boards
            </CenterLi>
          </CenterUl>
        </Center>
        <Right>
          <button onClick={handleLogin} className="faSignInAlt">
            {!loginBtn.email ? loginBtn.text : ""}
          </button>
          <button onClick={handleSignUP} className="faUserPlus">
            {!signUpBtn.email ? signUpBtn.text : ""}
          </button>
          <button className="memberBtn" onClick={handleMember}>
            {/* {email ? `hi,${memberBtn}` : ""} */}
          </button>
          {
            <button className="faShoppingCart " onClick={handleshopCart}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>
          }
        </Right>
      </Top>
    </Header>
  );
};
export default Nav;
