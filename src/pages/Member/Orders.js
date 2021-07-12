import React, { useState, useRef, useEffect } from "react";
import "../../styles/app.css";
import { useHistory } from "react-router-dom";
import "firebase/firestore";
import firebase from "firebase";

const db = firebase.firestore();

const OrderTitle = ({ titelItem }) => {
  return (
    <React.Fragment>
      <span>{titelItem}</span>
    </React.Fragment>
  );
};
const OrderDate = ({ dataItem }) => {
  return (
    <React.Fragment>
      <span>{dataItem}</span>
    </React.Fragment>
  );
};

const Orders = ({ item }) => {
  let history = useHistory();
  const [orderTitle, setOrderTitle] = useState([]);
  const [orderDate, setOrderDate] = useState([]);
  useEffect(() => {
    setOrderTitle(item.orderTitle);
  }, [orderTitle]);
  useEffect(() => {
    setOrderDate(item.orderDate);
  }, [orderDate]);
  const handleGotoConmment = (num, title) => {
    history.push("./conmment");
    console.log(num);
    localStorage.setItem("conmment", num);
    localStorage.setItem("title", title);
    //彈出填寫視窗
  };
  return (
    <React.Fragment>
      <div className="order_container">
        <div className="order_left">
          <span className="order_num">ORDER-NUMBER:{item.orderNum}</span>
          <span className="order_title">
            <div className="title_left">
              {orderTitle.map((titelItem) => {
                return <OrderTitle key={titelItem} titelItem={titelItem} />;
              })}
            </div>
            <div className="date_right">
              {orderDate.map((dataItem) => {
                return <OrderDate key={dataItem} dataItem={dataItem} />;
              })}
            </div>
          </span>
          <span
            className="goto_conmment"
            onClick={() => {
              handleGotoConmment(item.orderNum, item.orderTitle);
            }}
          >
            go to conmment
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Orders;
