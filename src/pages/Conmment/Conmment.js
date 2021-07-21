import React, { useState, useRef, useEffect } from "react";
import "firebase/firestore";
import firebase from "firebase";

const db = firebase.firestore();

let orderId;
let Arr_comment = [];
const Conmment = () => {
  let comment = localStorage.getItem("conmment");
  let title = localStorage.getItem("title");
  const [arr, setArr] = useState([]);
  useEffect(() => {
    db.collection("orders")
      .where("orderNum", "==", comment)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          orderId = doc.data().orderId;
          Arr_comment.push(orderId);
        });
      });
    setArr(Arr_comment);
  }, [arr]);
  // console.log(arr);
  const [text, setText] = useState("");
  const handleCommentChange = (e) => {
    // console.log(text);
    setText(e.target.value);
  };

  const handleComment = (e) => {
    e.preventDefault();
    let comment = localStorage.getItem("conmment");
    let orderName = localStorage.getItem("username");
    let d = new Date().toDateString();
    let title = localStorage.getItem("title");
    // console.log(1);
    if (comment) {
      db.collection("comments").add({
        orderNum: comment,
        text: text,
        orderName: orderName,
        orderTime: d,
        orderTitle: title,
      });
      // console.log(2);
      setText("");
      let success = document.createElement("div");
      success.innerHTML = "comment success";
      success.classList.add("comment_success");
      let body = document.querySelector("body");
      body.appendChild(success);
      setTimeout(() => {
        success.style.display = "none";
      }, 1500);
    }
  };

  // console.log(arr);
  return (
    <React.Fragment>
      <div className="conmment_container">
        <div className="conmment_wrap">
          {/* <div className="big_title"></div> */}
          <div className="comment_title">
            <div>
              <h4 className="order_title">{title !== null ? title : ""}</h4>
              <label htmlFor="">ORDER NUMBER:</label>
              <div className="order_num">{comment !== null ? comment : ""}</div>
              <h4 className="comment_title_your">type in your comment</h4>
              <span className="point">Less than 200 words</span>
              <form>
                <textarea
                  className="textarea"
                  onChange={handleCommentChange}
                  value={text}
                ></textarea>
                <br />
                <input
                  className="comment_btn"
                  type="submit"
                  value="Submit"
                  onClick={handleComment}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Conmment;
