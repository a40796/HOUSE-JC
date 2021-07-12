import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import "../styles/app.css";
import "firebase/firestore";
import firebase from "firebase";
import { firebaseConfig } from "../components/FirebaseKey";

const db = firebase.firestore();
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}
const database = firebase.database();

const Root = styled.div``;
const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #000000b5;
  z-index: 10;
`;
const Center = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 400px;
  height: 570px;
  background-image: linear-gradient(to bottom, #ecb9a9, #c5d5db);
  z-index: 3;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: calc(50% - 200px);
  top: calc(50% - 260px);
  border-radius: 10px;
`;
const SignupContainer = styled.div`
  height: 90%;
  width: 90%;
`;
const Logo = styled.div`
  width: 20%;
  margin-top: 20px;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
`;
const TitleH2 = styled.h2`
  margin-top: 10px;
  color: #707070;
  text-align: center;
`;
const SignUpGuide = styled.div``;

const SignupForm = ({ signupArea, setSignupArea }) => {
  let history = useHistory();
  const mailRef = useRef();
  const passRef = useRef();
  const nameRef = useRef();
  const maleRef = useRef();
  const femaleRef = useRef();
  const sexRef = useRef();
  const addressRef = useRef();
  const birthdayRef = useRef();

  // 處理登入 ===== began
  const handleSignup = (e) => {
    e.preventDefault();
    const userEmail = mailRef.current.value;
    const userPassword = passRef.current.value;
    const name = nameRef.current.value;
    const sex = sexRef.current.value;
    const address = addressRef.current.value;
    firebase
      .auth()
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
        // 儲存成功後顯示訊息
        db.collection("members").add({
          address: address,
          email: userEmail,
          name: name,
          password: userPassword,
          sex: sex,
        });
        let success = document.createElement("div");
        success.classList.add("success_signup");
        let text = document.createElement("span");
        text.innerHTML = "registration success";
        success.appendChild(text);
        document.querySelector("body").appendChild(success);
        setSignupArea(!signupArea);
        setTimeout(() => {
          success.style.display = "none";
        }, 2000);
        mailRef.current.value = "";
        passRef.current.value = "";
        nameRef.current.value = "";
        sexRef.current.value = "";
        addressRef.current.value = "";
        console.log("success");
      })
      .catch((err) => {
        // 註冊失敗時顯示錯誤訊息
        document.querySelector(".signup_errmsg").innerHTML = err.message;
        console.log("failed", err);
      });
  };
  // 處理登入 ===== end

  return (
    <form className="main signupForm">
      <label className="email" htmlFor="">
        Email
      </label>
      <input
        type="text"
        className="account_signup"
        name="account_signup"
        placeholder="email"
        ref={mailRef}
      />
      <label className="password" htmlFor="">
        Password
      </label>
      <input
        type="text"
        className="pass_signup"
        name="pass_signup"
        placeholder="type in the password"
        ref={passRef}
      />

      <label htmlFor="">Name</label>
      <input
        type="text"
        className="username"
        name="username"
        placeholder="type in your name"
        ref={nameRef}
      />
      <label>Please select your gender:</label>
      <div style={{ display: "flex", background: "white", padding: "2px" }}>
        <input type="radio" id="male" name="gender" value="male" ref={sexRef} />
        <label htmlFor="male">Male</label>
        <br />
        <input
          type="radio"
          id="female"
          name="gender"
          value="female"
          ref={sexRef}
        />
        <label htmlFor="female">Female</label>
        <br />
      </div>

      <label htmlFor="">Address</label>
      <input
        placeholder="type in your address"
        className="address"
        type="text"
        ref={addressRef}
      />
      <input
        type="submit"
        value="sign up"
        className="loginSubmit"
        onClick={handleSignup}
      />
      <span className="signup_errmsg"></span>
    </form>
  );
};

const SignupCell = ({ change, setChange, signupArea, setSignupArea }) => {
  return (
    <SignupContainer className={change ? "disappear" : "show"}>
      {/* <Logo img={logo3} /> */}
      <TitleH2>WELCOME , HOUSE JC</TitleH2>
      <SignupForm
        signupArea={signupArea}
        setSignupArea={setSignupArea}
      ></SignupForm>
    </SignupContainer>
  );
};

const Signup = ({ signupArea, setSignupArea }) => {
  const hadleClickCancel = () => {
    setSignupArea(!signupArea);
  };
  const [change, setChange] = useState(true);
  const handleLoginSignupShow = () => {
    setChange(!change);
  };
  return (
    <Root style={{ display: signupArea ? "flex" : "none" }}>
      <Wrapper>
        <Center>
          <FontAwesomeIcon
            onClick={hadleClickCancel}
            className="faTimes"
            icon={faTimesCircle}
          />
          <SignupCell
            setSignupArea={setSignupArea}
            signupArea={signupArea}
          ></SignupCell>
        </Center>
      </Wrapper>
    </Root>
  );
};

export default Signup;
