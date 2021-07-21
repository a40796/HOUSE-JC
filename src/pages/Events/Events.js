import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Event from "./Event";
import { EventsData } from "../../components/Data";
import {
  LG_BIGPAD,
  LG_PAD_960,
  MD_PAD,
  MD_PHONE_,
  SMAILL_PHONE_,
} from "../../constants/style";
import axios from "axios";

const Root = styled.div`
  width: 100vw;
  font-family: ProximaNova, sans-serif;
  text-align: center;
  padding-top: 10vh;
  padding-bottom: 25vh;
  background: rgb(243, 244, 245);
`;
const EventBigTitle = styled.h1`
  line-height: 1;
  font-family: cursive, sans-serif;
  font-size: 43px;
  /* font-weight: 200; */
  color: rgb(243, 121, 118);
  font-weight: 600;
  width: 32%;
  margin: 10vh auto;
  ${MD_PAD} {
    font-size: 30px;
    text-align: left;
  }
  ${MD_PHONE_} {
    width: 50%;
    text-align: center;
  }
`;
const EventWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  ${LG_BIGPAD} {
    width: 85%;
  }
`;
const CurrentWeather = styled.div`
  color: black;
  width: 100%;
`;
const JpWeather = styled.div`
  width: 85%;
  margin: 100px auto 0;
  text-align: end;
  color: #707070;
  display: flex;
  justify-content: flex-end;
  font-family: "courier", arial, sans-serif;
  ${MD_PAD} {
    font-size: 14px;
  }
  ${MD_PHONE_} {
    font-size: 12pxpx;
  }
`;

const City = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 5px;
  border-radius: 5px;
  margin-top: 7px;
  &:hover {
    box-shadow: 2px 2px #80808061;
  }
  ${MD_PAD} {
    font-size: 12px;
  }
`;

const WeatherWrap = styled.div`
  width: 20%;
  text-align: left;
  ${MD_PHONE_} {
    width: 30%;
  }
  ${SMAILL_PHONE_} {
    width: 40%;
  }
`;

// get weather api

let mykey = "f37710c7deb5f12a355ee5578c33a4fd";
let osaka = "osaka";
let tokyo = "tokyo";
let url_osaka = `https://api.openweathermap.org/data/2.5/weather?q=${osaka}&appid=${mykey}`;
let url_tokyo = `https://api.openweathermap.org/data/2.5/weather?q=${tokyo}&appid=${mykey}`;

const Events = ({ shopCartBtn, setShopCartBtn }) => {
  const [osakaData, setData] = useState("");
  const [tokyoData, setTokyoData] = useState("");

  useEffect(async () => {
    const result = await axios(url_osaka);
    // console.log(result);
    let osaka_cloud = result.data.weather[0].description;

    setData(osaka_cloud);
  }, [osakaData]);

  useEffect(async () => {
    const result = await axios(url_tokyo);
    let tokyo_cloud = result.data.weather[0].description;

    setTokyoData(tokyo_cloud);
  }, [tokyoData]);

  const [state, setState] = useState([]);
  useEffect(() => {
    function saveEventsInMap(data) {
      setState(data);
    }
    EventsData(saveEventsInMap);
    // EventsPic(500)
  }, []);

  return (
    <Root>
      <JpWeather>
        <WeatherWrap>
          <CurrentWeather>Current weather</CurrentWeather>
          <City>
            Tokyo:<span className="tokyo">{tokyoData}</span>
            Osaka:<span className="osaka">{osakaData}</span>
          </City>
        </WeatherWrap>
      </JpWeather>
      <EventBigTitle>Pick the card , you interest in</EventBigTitle>
      <EventWrapper>
        {state.map((item) => {
          return (
            <Event
              key={item.id}
              item={item}
              shopCartBtn={shopCartBtn}
              setShopCartBtn={setShopCartBtn}
            />
          );
        })}
      </EventWrapper>
    </Root>
  );
};

export default Events;
