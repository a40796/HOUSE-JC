import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "../../styles/app.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";

const ShopcartItem = ({ item, state, setState, listArr }) => {
  // console.log(state);

  const handleCancel = (id) => {
    console.log(id);
    let a = listArr.filter((item) => item.orderId !== id);
    let aString = JSON.stringify(a);
    localStorage.setItem("list", aString);
    setState(aString);
  };
  return (
    <div className="shop">
      <div className="item_cell">
        <ul className="shop_item">
          <span className="order_smalltitle">ORDER-NUMBER:</span>
          {item.orderId}
          <li className="item_style">{item.orderTitle}</li>
          <li className="item_style">{item.orderContent}</li>
          <li className="item_style">
            <span>date:</span>
            {item.orderDate}
          </li>
          <li className="item_style">
            <span>money:</span>
            {item.orderMoney}
          </li>
          <li className="item_style">
            <span>people:</span>
            {item.orderNum}
          </li>
          <li className="item_style">
            <span>place:</span>
            {item.orderPlace}
          </li>
        </ul>
        <div>
          <img className="orderImg" src={item.orderImg}></img>
        </div>
      </div>
      <div
        className="order_comfirm_btn"
        id={item.orderId}
        onClick={(e) => {
          handleCancel(e.target.id);
        }}
      >
        cancel
      </div>
    </div>
  );
};

const Shopcart = () => {
  let history = useHistory();
  let list = localStorage.getItem("list");
  // console.log(list);
  let listArr = JSON.parse(list);
  const [state, setState] = useState(false);
  const gotoCreditPay = () => {
    history.push("/credit");
  };

  return (
    <React.Fragment>
      <div className="shop_wrap">
        <h2 className="comfirm_title">
          {listArr !== null ? (
            "Please confirm your order"
          ) : (
            <div
              className="go_to_buy"
              onClick={() => {
                history.push("./events");
              }}
            >
              <span>You didn't buy anything</span>
              <br />
              <span>Go to select an exclusive trip</span>
              <br />
              <FontAwesomeIcon
                style={{ marginTop: "10px" }}
                icon={faArrowCircleDown}
              />
            </div>
          )}
        </h2>
        <div className="shop_confirm">
          {listArr !== null
            ? listArr.map((item) => {
                return (
                  <ShopcartItem
                    key={item.orderId}
                    item={item}
                    state={state}
                    setState={setState}
                    listArr={listArr}
                  ></ShopcartItem>
                );
              })
            : ""}
          {listArr !== null ? (
            <p onClick={gotoCreditPay} className="gotoPay">
              Go to payment
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Shopcart;
