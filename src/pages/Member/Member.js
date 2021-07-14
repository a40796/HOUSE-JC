import React, { useState, useRef, useEffect } from "react";
import "../../styles/app.css";
import { useHistory } from "react-router-dom";
import "firebase/firestore";
import firebase from "firebase";
import Orders from "../Member/Orders";

const db = firebase.firestore();

const handlelocalStorageData = () => {
  let name = localStorage.getItem("username");
  let email = localStorage.getItem("userEmail");
  let photo = localStorage.getItem("userPhoto");
  let address = localStorage.getItem("userAddress");
  let sex = localStorage.getItem("userSex");
  let password = localStorage.getItem("userPassword");
  // console.log(name,email,photo);
  let memberInfoData = {
    name: name,
    email: email,
    photo: photo,
    address: address,
    sex: sex,
    password: password,
  };
  return memberInfoData;
};
let infoData = handlelocalStorageData();
const handleLogOut = (history) => {
  alert("Log out successfully");
  localStorage.clear();
  history.push("/");
  window.location.reload();
};

const Member = ({ shopCartBtn, setShopCartBtn }) => {
  let history = useHistory();
  const mailRef = useRef();
  const nameRef = useRef();
  const addressRef = useRef();
  const sexRef = useRef();
  const [btnstate, setBtnstate] = useState(true);
  const [arr, setArr] = useState([]);

  // 更新按鈕呈現可以編輯狀態
  const handleRevise = () => {
    setBtnstate(false);
  };

  //更新完enter
  const handleEnter = () => {
    setBtnstate(true);
  };

  // 更新名字
  const handleUpdateName = (e) => {
    // console.log(e.target.value);
    let resetName = e.target.value;
    db.collection("members")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let userEmail = localStorage.getItem("userEmail");
          if (userEmail === doc.data().email) {
            //  console.log(doc.id)
            let id = doc.id;
            db.collection("members").doc(id).update({ name: resetName });
            localStorage.setItem("username", resetName);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        });
      });
  };
  //更新pasword
  const handleUpdatePass = (e) => {
    // console.log(e.target.value);
    let resetPass = e.target.value;
    db.collection("members")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let userEmail = localStorage.getItem("userEmail");
          if (userEmail === doc.data().email) {
            //  console.log(doc.id)
            let id = doc.id;
            db.collection("members").doc(id).update({ password: resetPass });
            localStorage.setItem("userPassword", resetPass);
          }
        });
      });
  };

  //更新地址
  const handleUpdateAddress = (e) => {
    // console.log(e.target.value);
    let resetAddress = e.target.value;
    db.collection("members")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let userEmail = localStorage.getItem("userEmail");
          if (userEmail === doc.data().email) {
            //  console.log(doc.id)
            let id = doc.id;
            db.collection("members").doc(id).update({ address: resetAddress });
            localStorage.setItem("userAddress", resetAddress);
          }
        });
      });
  };

  //更新性別
  const handleUpdateSex = (e) => {
    // console.log(e.target.value);
    let resetSex = e.target.value;
    db.collection("members")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let userEmail = localStorage.getItem("userEmail");
          if (userEmail === doc.data().email) {
            //  console.log(doc.id)
            let id = doc.id;
            db.collection("members").doc(id).update({ userSex: resetSex });
            localStorage.setItem("userSex", resetSex);
          }
        });
      });
  };

  //如果使用者有訂單的話 => 存入localstorage => 將訂單呈現在畫面上
  let userEmail = localStorage.getItem("userEmail");
  useEffect(() => {
    db.collection("orders")
      .get()
      .then((querySnapshot) => {
        const order_arr = [];
        querySnapshot.forEach((doc) => {
          // console.log(doc.data());
          if (doc.data().userEmail === userEmail) {
            // console.log(1);
            let orderNum = doc.data().orderNum;
            let orderId = doc.data().orderId;
            // console.log(orderId);
            let orderTitleArr = [];
            let orderDateArr = [];
            // 將 一筆訂單編號中的 所有title名稱取出
            for (let i = 0; i < orderId.length; i++) {
              orderTitleArr.push(orderId[i].orderTitle);
              orderDateArr.push(orderId[i].orderDate);
            }
            // console.log(orderDateArr);
            //放入要map子元件的陣列中
            order_arr.push({
              orderNum: orderNum,
              orderTitle: orderTitleArr,
              orderDate: orderDateArr,
            });
          }
        });
        setArr(order_arr);
      });
  }, []);
  //處理訂單完成後的資料
  let order_num = localStorage.getItem("orderNum");
  let order_list = localStorage.getItem("list");

  //處理user照片
  db.collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data().userUrl);
        let url = doc.data().userUrl;
        document.querySelector(".member_photo").setAttribute("src", url);
      });
    });

  return (
    <React.Fragment>
      <div className="memberCenter">
        <div className="member_information">
          <img className="member_photo"></img>
          <form className="member_info">
            <label className="member_personal">PERSONAL INFORMATION</label>
            <div className="mem_info">
              <span>NAME:</span>
              <input
                className="memeber_input"
                ref={nameRef}
                defaultValue={`${infoData.name}`}
                onChange={handleUpdateName}
                disabled={btnstate}
                onClick={() => {
                  console.log("test");
                }}
              />
            </div>
            <div className="mem_info">
              <span>EMAIL:</span>
              <input
                className="memeber_input"
                ref={mailRef}
                defaultValue={`${infoData.email}`}
                disabled
              />
            </div>
            <div className="mem_info">
              <span>{infoData.password ? "PASSWORD:" : ""}</span>
              <input
                className="memeber_input"
                ref={mailRef}
                defaultValue={infoData.password ? `${infoData.password}` : ""}
                onChange={handleUpdatePass}
                disabled={btnstate}
              />
            </div>
            <div className="mem_info">
              <span>{infoData.address ? "ADDRESS" : ""}</span>{" "}
              <input
                className="memeber_input"
                ref={addressRef}
                defaultValue={infoData.address ? `${infoData.address}` : ""}
                onChange={handleUpdateAddress}
                disabled={btnstate}
              />
            </div>
            <div className="mem_info">
              <span>{infoData.sex ? "SEX:" : ""}</span>{" "}
              <input
                className="memeber_input"
                ref={sexRef}
                defaultValue={infoData.sex ? `${infoData.sex}` : ""}
                onChange={handleUpdateSex}
                disabled={btnstate}
              />
            </div>

            <div className="btn">
              <span
                onClick={() => {
                  handleLogOut(history);
                }}
                className="logout"
              >
                log out
              </span>
              <span className="revise_ " onClick={handleRevise}>
                revise
              </span>
              <span className="enter_ " onClick={handleEnter}>
                enter
              </span>
            </div>
          </form>
        </div>
        <div className="member_order_information">
          <h4 className="order_info_title">ORDER INFORMATION</h4>
          {arr.length > 0 ? (
            arr.map((item) => {
              return <Orders key={item.orderNum} item={item} />;
            })
          ) : (
            <div style={{ textAlign: "center", padding: "10px" }}>
              <button
                className="shopNow"
                onClick={() => {
                  history.push("./events");
                }}
              >
                travel now
              </button>
              <p>No orders yet</p>
            </div>
          )}
          {/* <Orders /> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Member;
