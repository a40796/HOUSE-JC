import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "firebase/firestore";
import firebase from "firebase";
import "../../styles/app.css";
import {
  LG_BIGPAD,
  LG_PAD_960,
  MD_PAD,
  MD_PHONE_,
  SMAILL_PHONE_,
} from "../../constants/style";

const db = firebase.firestore();

const EventCell = styled.div`
  width: 28vw;
  height: 34vh;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 20px;
  ${LG_BIGPAD} {
    width: 48%;
  }
  ${MD_PHONE_} {
    width: 80%;
  }
  ${SMAILL_PHONE_} {
    width: 100%;
  }
  &:hover {
    box-shadow: 2px 2px #70707073;
  }
`;
const EventCellTitle = styled.div`
  font-size: 2rem;
  width: 90%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Event_left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 30px;
`;
const Event_span_title = styled.span`
  font-size: 30px;
`;
const Event_span = styled.span`
  text-align: left;
`;
const EventCellImg = styled.img`
  ${LG_BIGPAD} {
    width: 100%;
  }
`;
const FontAwesomeIcon__ = styled(FontAwesomeIcon)`
  margin: 10px 0 0 10px;
`;
const FontAwesomeIcon_ = styled(FontAwesomeIcon)`
  width: 90%;
  margin: 0 auto;
`;
const EventCellBtn = styled.button`
  background: none;
  border: none;
  text-align: left;
  margin: 1rem auto;
  width: 90%;
  font-size: 1.2rem;
  color: #707070;
  width: 5vw;
  text-align: center;
  border-radius: 10px;
  ${LG_BIGPAD} {
    width: 25%;
  }
  &:hover {
    background: rgb(6, 102, 235);
    color: white;
  }
`;
const CenterWrap = styled.div`
  width: 95%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${LG_BIGPAD} {
    font-size: 14px;
  }
`;
const EventWrap = styled.div``;
const ImgWrap = styled.div`
  display: flex;
  align-items: center;
`;
const Event = (props) => {
  const [quesiton, setQuestion] = useState(true);

  const HandleGrasp = (id) => {
    setQuestion({
      state: !quesiton.state,
    });
  };

  const handleShopCart = (id) => {
    // 存入狀態 購物車icon 顯示

    let userEmail = localStorage.getItem("userEmail");

    if (userEmail === null) {
      localStorage.setItem("list", []);
      let login_alert = document.createElement("div");
      let text = document.createElement("div");
      text.classList.add("text");
      let pleaseLogin = document.createElement("p");
      pleaseLogin.innerHTML = "Please login first";
      let plaseSignup = document.createElement("p");
      plaseSignup.innerHTML =
        "If you do not have an account, please apply first";
      login_alert.classList.add("login_alert");
      let x = document.createElement("span");
      x.innerHTML = "X";
      x.classList.add("_x");
      let body = document.querySelector("body");
      body.appendChild(login_alert);
      login_alert.appendChild(x);
      let area = login_alert.appendChild(text);
      area.appendChild(pleaseLogin);
      area.appendChild(plaseSignup);
      x.addEventListener("click", (e) => {
        console.log(e.target.value);
        login_alert.style.display = "none";
      });
      setTimeout(() => {
        login_alert.style.display = "none";
      }, 5000);
    }
    db.collection("Events")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id === id) {
            let orderId = doc.id;
            let orderContent = doc.data().content;
            let orderDate = doc.data().date;
            let orderImg = doc.data().img;
            let orderMoney = doc.data().money;
            let orderNum = doc.data().num;
            let orderPlace = doc.data().place;
            let orderTitle = doc.data().title;
            let userOrder = {
              orderId,
              orderContent,
              orderDate,
              orderImg,
              orderMoney,
              orderNum,
              orderPlace,
              orderTitle,
            };
            let userList = localStorage.getItem("list");
            if (userList == null) {
              localStorage.setItem("list", JSON.stringify([userOrder]));
            } else {
              let userArray = JSON.parse(userList);
              userArray.push(userOrder);
              localStorage.setItem("list", JSON.stringify(userArray));
            }
          }
        });
      });
  };
  return (
    <EventCell key={props.item.id} HandleGrasp={HandleGrasp}>
      <FontAwesomeIcon__
        style={{ display: quesiton.state ? "block" : "none" }}
        className="faTimes"
        icon={faShoppingCart}
        onClick={() => {
          handleShopCart(props.item.id);
        }}
      />
      <CenterWrap>
        <Event_left>
          <Event_span> {quesiton.state ? props.item.content : ""}</Event_span>
          <Event_span>
            {" "}
            {quesiton.state
              ? `Date:${quesiton.state ? props.item.date : ""}`
              : ""}
          </Event_span>
          <Event_span>
            {" "}
            {quesiton.state
              ? `Total price:${quesiton.state ? props.item.money : ""}`
              : ""}
          </Event_span>
          <Event_span_title>
            {" "}
            {!quesiton.state ? props.item.title : ""}
          </Event_span_title>
          <Event_span>
            {quesiton.state
              ? `Location:${quesiton.state ? props.item.place : ""}`
              : ""}
          </Event_span>
          <Event_span>
            {quesiton.state
              ? `People:${quesiton.state ? props.item.num : ""}`
              : ""}
          </Event_span>
        </Event_left>
        <ImgWrap>
          <EventCellImg
            src={props.item.img}
            style={{ display: quesiton.state ? "block" : "none" }}
            className="eventStyle"
            img={props.item.img}
          />
        </ImgWrap>
      </CenterWrap>

      <FontAwesomeIcon_ className="faTimes" icon={faArrowDown} />
      <EventCellBtn
        id={props.item.id}
        onClick={() => HandleGrasp(props.item.id)}
      >
        grasp
      </EventCellBtn>
    </EventCell>
  );
};

export default Event;
