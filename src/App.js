import React, { useState, useRef } from "react";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import News from "./pages/News";
import Events from "./pages/Events";
import Blogger from "./pages/Boards";
import Member from "./pages/Member";
import Shopcart from "./pages/Shopcart";
import Credit from "./pages/Credit";
import Conmment from "./pages/Conmment";
import logo3 from "./img/logo3.png";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import "./styles/app.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {
  LG_BIGPAD,
  LG_PAD_960,
  MD_PAD,
  MD_PHONE_,
  SMAILL_PHONE_,
} from "./constants/style";

const AppContainer = styled.div`
  margin: -33px auto 0;
  font-family: Avenir;
  background-color: #eaece9;
  padding-top: 33px;
  opacity: 1;
`;
const PanelWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #000000b5;
  z-index: 10;
  ${LG_BIGPAD} {
  }
`;

const PanelContainer = styled.div`
  display: flex;
  width: 30vw;
  height: 100vh;
  background-image: linear-gradient(to bottom, #ecb9a9, #c5d5db);
  z-index: 3;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${LG_BIGPAD} {
    width: 50vw;
    font-size: 12px;
  }
  ${MD_PHONE_} {
    width: 100vw;
  }
`;
const PanelNews = styled(Link)`
  color: black;
  text-decoration: none;
  color: #036eb8;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: 16vw;
  margin-top: 4vh;
  ${MD_PHONE_} {
    color: #707070;
    font-size: 16px;
    margin-top: 100px;
    width: 70%;
  }
`;
const PanelEvents = styled(Link)`
  color: black;
  text-decoration: none;
  color: #036eb8;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: 16vw;
  margin-top: 5vh;
  ${MD_PHONE_} {
    color: #707070;
    font-size: 16px;
    width: 70%;
  }
`;
const PanelProjects = styled(Link)`
  color: black;
  text-decoration: none;
  color: #036eb8;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: 16vw;
  margin-top: 5vh;
  ${MD_PHONE_} {
    color: #707070;
    font-size: 16px;
    width: 70%;
  }
`;
const PanelP = styled.p`
  color: #036eb8;
  color: #707070;
  ${MD_PHONE_} {
    display: none;
  }
`;
const PanelSlogan = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  background: white;
  margin-top: 50px;
  padding: 20px;
  color: #707070;
  background: #ffffff63;
  ${MD_PAD} {
    width: 70%;
  }
  ${MD_PHONE_} {
    text-align: center;
    margin-top: 120px;
  }
`;
const PanelSpan = styled.span``;
const PanelLogo = styled.img`
  width: 15%;
  margin-bottom: 100px;
`;

const Panel = ({ style }) => {
  const cancelBtn = useRef(null);
  const handleCancleClick = () => {
    cancelBtn.current.style.display = "none";
  };
  return (
    <PanelWrapper style={style} ref={cancelBtn}>
      <PanelContainer>
        <PanelLogo src={logo3} alt="logo3"></PanelLogo>
        <div className="cancleBtn" onClick={handleCancleClick}>
          <FontAwesomeIcon className="faTimes" icon={faTimesCircle} />
        </div>
        <PanelNews to="/news" onClick={handleCancleClick}>
          NEWS
          <PanelP>House H</PanelP>
          <PanelP>Shibaura house</PanelP>
          <PanelP>Mini park toilet</PanelP>
        </PanelNews>
        <PanelEvents to="/events" onClick={handleCancleClick}>
          EVENTS
          <PanelP>Geisha architecture</PanelP>
          <PanelP>About eating architecture</PanelP>
        </PanelEvents>
        <PanelProjects to="/boards" onClick={handleCancleClick}>
          BOARDS
          <PanelP>Old-fashioned building</PanelP>
          <PanelP>Mr.Ando's hometown</PanelP>
        </PanelProjects>
        <PanelSlogan>
          <PanelSpan> Culture, Soul and Architecture | House jc</PanelSpan>
          <PanelSpan> © All rights reserved. House jc since 2020.</PanelSpan>
        </PanelSlogan>
      </PanelContainer>
    </PanelWrapper>
  );
};

function App() {
  const handleLogin = () => {
    // console.log('test');
    setLoginArea(!loginArea);
  };
  const handleSignUP = () => {
    // console.log('test');
    setSignupArea(!signupArea);
  };
  const [bgc, setBgc] = useState("#c5d5db");
  const ChangeBgc = () => {
    // console.log(bgc)
    setBgc("red");
  };
  const buttonRef = useRef();
  const [areaShow, setareaShow] = useState(false);
  const [loginArea, setLoginArea] = useState(false);
  const [signupArea, setSignupArea] = useState(false);
  const [bar, setBar] = useState({
    state: true,
    text: "O",
  });
  const handlePanel = () => {
    setareaShow(!areaShow);
    // console.log(buttonRef.current);
  };
  return (
    <AppContainer>
      <Nav
        handleSignUP={handleSignUP}
        handleLogin={handleLogin}
        handlePanel={handlePanel}
        bar={bar}
        buttonRef={buttonRef}
        ChangeBgc={ChangeBgc}
        bgc={bgc}
      />
      <Panel style={{ display: areaShow ? "flex" : "none" }} />
      <Login
        loginArea={loginArea}
        setLoginArea={setLoginArea}
        signupArea={signupArea}
        setSignupArea={setSignupArea}
      />
      <Signup signupArea={signupArea} setSignupArea={setSignupArea} />

      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/news">
          <News />
        </Route>
        <Route path="/events">
          <Events />
        </Route>
        <Route path="/boards">
          <Blogger />
        </Route>
        <Route path="/member">
          <Member />
        </Route>
        <Route path="/shopcart">
          <Shopcart />
        </Route>
        <Route path="/credit">
          <Credit />
        </Route>
        <Route path="/conmment">
          <Conmment />
        </Route>
      </Switch>

      <Footer />
    </AppContainer>
  );
}

export default App;
