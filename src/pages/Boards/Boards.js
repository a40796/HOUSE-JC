import React, { useState, useRef, useEffect } from "react";
import "../../styles/app.css";
import "firebase/firestore";
import firebase from "firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import {
  LG_BIGPAD,
  LG_PAD_960,
  MD_PAD,
  MD_PHONE_,
  SMAILL_PHONE_,
} from "../../constants/style";

const db = firebase.firestore();

// 通過 URL 下載數據
var storageRef = firebase.storage().ref();

storageRef
  .child("events/Gei.png")
  .getDownloadURL()
  .then((url) => {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      var blob = xhr.response;
    };
    xhr.open("GET", url);
    xhr.send();
    console.log(url);
  })
  .catch((error) => {
    console.log(error);
    // Handle any errors
  });

const Conmment_item = ({ item }) => {
  return (
    <div className="item" key={item.orderNum}>
      <div className="order_wrap">
        <div className="orderTime">{item.orderTime}</div>
        <div className="orderTitle">{item.orderTitle}</div>
        <div className="orderName">{item.orderName}</div>
        <FontAwesomeIcon style={{ color: "gray" }} icon={faCommentDots} />
        <div className="orderText">{item.text}</div>
      </div>
    </div>
  );
};

const Conmment_img = ({ item }) => {
  return (
    <React.Fragment>
      <div className="img_photo">
        <img className="img_item" src={item.imgurl}></img>
      </div>
    </React.Fragment>
  );
};

//將firbase中的comment抓出來

const ReferanceComment = (callback) => {
  let Arr_comment = [];
  db.collection("comments")
    .orderBy("orderTime")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        Arr_comment.push(doc.data());
      });
      callback(Arr_comment);
    });
};

//將firbase中的events img 抓出來

const ReferenceImg = (callback) => {
  let Arr_img = [];
  db.collection("comment")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        Arr_img.push(doc.data());
      });
      callback(Arr_img);
    });
};

const Blogger = () => {
  const [img, setImg] = useState([]);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    function saveEventsInMap(data) {
      setImg(data);
    }
    ReferenceImg(saveEventsInMap);
  }, []);
  useEffect(() => {
    function saveEventsInMap(data) {
      setArr(data);
    }
    ReferanceComment(saveEventsInMap);
  }, []);

  return (
    <React.Fragment>
      <div className="blogger_container">
        <h4 className="blogger_top_title">- Many photos are worth taking -</h4>
        <div className="" className="blogger_img">
          {img.map((item) => {
            return <Conmment_img item={item} />;
          })}
        </div>
        <h4 className="blogger_title">- Worthy of your reference - </h4>
        <div className="blogger_comment">
          {arr.map((item) => {
            return <Conmment_item item={item} />;
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Blogger;
