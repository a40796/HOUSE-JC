import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "../styles/app.css";
import "firebase/firestore";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import "../styles/app.css";

const db = firebase.firestore();

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
  height: 500px;
  background-image: linear-gradient(to bottom, #ecb9a9, #c5d5db);
  z-index: 3;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: calc(50% - 200px);
  top: calc(50% - 250px);
  border-radius: 10px;
`;
const LoginContainer = styled.div`
  height: 90%;
  width: 90%;
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

const SignUPSlogan = styled.div`
  text-align: center;
  color: #707070;
  margin-top: 40px;
`;

// Facebook sign-in
const handleFacebookLogin = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;
      var user = result.user;
      var accessToken = credential.accessToken;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
};

// Google sign-in
const HandleGoogleLogin = (history, loginArea, setLoginArea, LoginDom) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;
      var userEmail = user.email;
      var userDisplayname = user.displayName;
      var userPhoto = user.photoURL;
      console.log(userEmail, userDisplayname, userPhoto);
      localStorage.setItem("username", userDisplayname);
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("userPhoto", userPhoto);
      //確認資料庫有沒有會員資料，沒有=>匯入
      db.collection("members")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // console.log(doc.data().userEmail);
            let DbuserEmail = doc.data().userEmail;
            if (DbuserEmail !== userEmail) {
              db.collection("members").add({
                name: userDisplayname,
                email: userEmail,
                personUrl: userPhoto,
              });
            }
          });
        });

      var user = firebase.auth().currentUser;
      if (user) {
        console.log(user);
        // alert("login success");
      }
      history.push("/");
      setLoginArea(!loginArea);
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
};

let list = localStorage.getItem("list");

const LoginForm = ({ loginArea, setLoginArea, setSignupArea, signupArea }) => {
  let history = useHistory();
  const emailRef = useRef();
  const passRef = useRef();
  const [error, setError] = useState(false);
  // 處理登入
  const handleLogin = (e) => {
    let email = emailRef.current.value;
    let password = passRef.current.value;
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((success) => {
        console.log("success", success);
        db.collection("members")
          .where("email", "==", email)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.data());
              let userAddress = doc.data().address;
              let userEmail = doc.data().email;
              let userName = doc.data().name;
              let userPassword = doc.data().password;
              let userPersonalUrl = doc.data().personUrl;
              let userSex = doc.data().sex;
              localStorage.setItem("username", userName);
              localStorage.setItem("userEmail", userEmail);
              localStorage.setItem("userPassword", userPassword);
              localStorage.setItem("userAddress", userAddress);
              localStorage.setItem("userPersonalUrl", userPersonalUrl);
              localStorage.setItem("userSex", userSex);
            });
            window.location.reload();
            history.push("/");
            setLoginArea(!loginArea);
          });
      })
      .catch((error) => {
        console.log("faild", error);
        document.querySelector(".errormsg_login").innerHTML = error.message;
      });
  };
  // 使用者試圖登入，但還不是會員時
  return (
    <form className="main" method="POST" action="">
      <label className="email" htmlFor="">
        Email
      </label>
      <input
        type="text"
        className="account_login"
        name="account_login"
        placeholder="email"
        ref={emailRef}
      />
      <label className="password" htmlFor="">
        Password
      </label>
      <input
        type="text"
        className="pass_login"
        name="pass_login"
        placeholder="Please fill in more than six numbers or letters"
        ref={passRef}
      />
      <div className="errormsg_login"></div>
      <input
        type="submit"
        value="log in"
        className="loginSubmit"
        onClick={handleLogin}
      />
      <div className="fbGoogleLogin">
        <p className="or">or</p>
        {/* <a onClick={handleFacebookLogin} className="fbLogin" href="###">
          WITH FACEBOOK
        </a> */}
        <a
          onClick={() => {
            HandleGoogleLogin(history, loginArea, setLoginArea);
          }}
          className="googleLogin"
          href="###"
        >
          WITH GOOGLE
        </a>
      </div>
    </form>
  );
};

const LoginCell = ({ loginArea, setLoginArea, signupArea, setSignupArea }) => {
  return (
    <LoginContainer>
      {/* <Logo img={logo3} /> */}
      <TitleH2>HOUSE JC</TitleH2>
      <LoginForm
        loginArea={loginArea}
        setLoginArea={setLoginArea}
        signupArea={signupArea}
        setSignupArea={setSignupArea}
      ></LoginForm>
      <SignUPSlogan>Culture, Soul and Architecture | House jc</SignUPSlogan>
    </LoginContainer>
  );
};

const Login = ({ loginArea, setLoginArea, signupArea, setSignupArea }) => {
  const hadleClickCancel = () => {
    setLoginArea(!loginArea);
  };
  const [change, setChange] = useState(true);
  const handleLoginSignupShow = () => {
    setChange(!change);
  };
  return (
    <Root style={{ display: loginArea ? "flex" : "none" }}>
      <Wrapper>
        <Center>
          <FontAwesomeIcon
            onClick={hadleClickCancel}
            className="faTimes"
            icon={faTimesCircle}
          />
          <LoginCell
            loginArea={loginArea}
            setLoginArea={setLoginArea}
            signupArea={signupArea}
            setSignupArea={setSignupArea}
          ></LoginCell>
        </Center>
      </Wrapper>
    </Root>
  );
};

export default Login;
