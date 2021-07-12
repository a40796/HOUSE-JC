import firebase from "firebase";
import { firebaseConfig } from "./FirebaseKey";
import React, { useEffect } from "react";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const storage = firebase.storage();
export { storage, firebase as default };

// news資料引入
export const NewsData = (callback) => {
  db.collection("News")
    .get()
    .then((querySnapshot) => {
      let news = [];
      querySnapshot.forEach((doc) => {
        news.push({
          id: doc.id,
          name: doc.data().name,
          title: doc.data().title,
          classify: doc.data().classify,
          img: doc.data().img,
        });
      });
      callback(news);
    });
};

//news照片引入
export function NewsPic(time) {
  const storageRef = firebase.storage().ref();
  const gelleryImg = storageRef.child("news/Gallery.png");
  const househImg = storageRef.child("news/housec.png");
  const moriyamaImg = storageRef.child("news/moriyama.png");
  const nycImg = storageRef.child("news/nyc.png");
  const shibauruImg = storageRef.child("news/shibauru.png");
  const gardenImg = storageRef.child("news/garden.png");
  const cabinetImg = storageRef.child("news/cabinet.png");
  const toiletImg = storageRef.child("news/toilet.png");
  const houseuImg = storageRef.child("news/houseu.png");
  const NewsArr = [
    gelleryImg,
    househImg,
    moriyamaImg,
    nycImg,
    shibauruImg,
    gardenImg,
    cabinetImg,
    toiletImg,
    houseuImg,
  ];
  setTimeout(() => {
    for (let i = 0; i < NewsArr.length; i++) {
      NewsArr[i].getDownloadURL().then(function (url) {
        // console.log(url);
        document.getElementsByClassName("newsImg")[i].src = url;
        console.log(i, url);
      });
    }
  }, time);
}

//Events 資料引入

export const EventsData = (callback) => {
  db.collection("Events")
    .get()
    .then((querySnapshot) => {
      let events = [];
      querySnapshot.forEach((doc) => {
        events.push({
          id: doc.id,
          name: doc.data().name,
          title: doc.data().title,
          content: doc.data().content,
          date: doc.data().date,
          place: doc.data().place,
          money: doc.data().money,
          num: doc.data().num,
          img: doc.data().img,
        });
      });
      callback(events);
    });
};

//events照片引入

export function EventsPic(time) {
  const storageRef = firebase.storage().ref();
  const oldStyleImg = storageRef.child("events/oldStyle.png");
  const GeishaImg = storageRef.child("events/Geisha.png");
  const awardImg = storageRef.child("events/award.png");
  const oldImg = storageRef.child("events/oldStyle.png");
  const eatImg = storageRef.child("events/eat.png");
  const andoImg = storageRef.child("events/ando.png");
  const EventsArr = [
    oldStyleImg,
    GeishaImg,
    awardImg,
    oldImg,
    eatImg,
    GeishaImg,
    andoImg,
    GeishaImg,
    GeishaImg,
  ];
}
EventsPic();
