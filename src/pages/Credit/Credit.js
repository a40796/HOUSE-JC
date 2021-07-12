import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import "firebase/firestore";
import firebase from "firebase";

const db = firebase.firestore();

const Credit = () => {
  let history = useHistory();
  const getLocalStorageMoney = () => {
    let list = localStorage.getItem("list");
    let listArr = JSON.parse(list);
    let money = listArr.map((item) => {
      return item.orderMoney;
    });
    let len = money.length;
    let sum = 0;
    for (let i = 0; i < len; i++) {
      sum += money[i];
    }
    return sum;
  };
  let needToPay = getLocalStorageMoney();
  // console.log(needToPay);

  const handleFinalBuy = () => {
    document.querySelector(".credit_wrap").style.display = "none";
    document.querySelector(".comfrim_btn").style.display = "none";
    let thankYou = document.createElement("div");
    thankYou.setAttribute("class", "thank");
    let p = document.createElement("p");
    p.setAttribute("class", "thankTxt");
    p.innerHTML = "thank you for your buy";
    let buyNum = uuidv4();
    localStorage.setItem("orderNum", buyNum);
    console.log(buyNum);
    let buyNumSpan = document.createElement("span");
    buyNumSpan.innerHTML = `Purchase number:${buyNum}`;
    buyNumSpan.setAttribute("class", "Purchase_num");
    thankYou.appendChild(p);
    thankYou.appendChild(buyNumSpan);
    document.body.appendChild(thankYou);

    // 將訂單細項編號 從localstorage拿出
    let list = localStorage.getItem("list");
    let listArr = JSON.parse(list);

    // 購買當下的使用者email
    let userEmail = localStorage.getItem("userEmail");

    //再將 確認後的訂單存入 firebase
    db.collection("orders").add({
      orderNum: buyNum,
      userEmail: userEmail,
      orderId: listArr,
    });

    //確認購買後 將localstorage的資料刪除
    localStorage.removeItem("list");
    localStorage.removeItem("orderNum");
    // document.querySelector(".faShoppingCart").style.display = "none";

    localStorage.setItem("status", false);

    setTimeout(() => {
      thankYou.style.display = "none";
      history.push("/member");
    }, 2000);
  };

  const handlePre = () => {
    history.push("/shopcart");
  };

  // TapPay 信用卡卡號驗證
  // TPDirect.setupSDK(
  //   "12348",
  //   "app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF",
  //   "sandbox"
  // );
  // TPDirect.card.setup("#cardview-container");

  return (
    <React.Fragment>
      <div className="pay_container">
        <h2 className="credit_title">credit card payment</h2>
        <div className="credit_wrap">
          <div className="credit_container">
            <label className="label_" for="cname">
              Name on Card
            </label>
            <input
              type="text"
              id="cname"
              className="input_"
              name="cardname"
              placeholder="John More Doe"
            />
            <label className="label_" for="ccnum">
              Credit card number
            </label>
            <div id="cardview-container"></div>
            <input
              type="text"
              id="credit_card_num"
              className="input_"
              name="cardnumber"
              placeholder="1111-2222-3333-4444"
            />
            <label className="label_" for="expmonth">
              Exp Month
            </label>
            <input
              type="text"
              id="expmonth"
              className="input_"
              name="expmonth"
              placeholder="September"
            />
          </div>
          <div className="total_pay">
            <h4 className="total">total</h4>
            <p>
              <span className="sum_total">NT:{needToPay}</span>
            </p>
          </div>
          <button className="credit_btn" onClick={handleFinalBuy}>
            Confirm to buy
          </button>
        </div>
        <div className="comfrim_btn">
          <button onClick={handlePre} className="pre_btn">
            <FontAwesomeIcon className="faPre" icon={faArrowCircleLeft} />
            Previous page, go to buy
          </button>
          {/* <button className="finail_confirm_tobuy"></button> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Credit;
