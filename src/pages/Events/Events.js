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

const Root = styled.div`
  width: 100vw;
  font-family: ProximaNova, sans-serif;
  text-align: center;
  padding-top: 10vh;
  padding-bottom: 25vh;
  background: rgb(243, 244, 245);
`;
const EventSubTitle = styled.h4`
  font-size: 14px;
  color: #707070;
  text-align: left;
  padding: 0 10px;
  ${MD_PAD} {
    padding: 0;
  }
  ${MD_PHONE_} {
    display: none;
  }
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
const Events = ({ shopCartBtn, setShopCartBtn }) => {
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
      <EventBigTitle>
        <EventSubTitle>Start you Travel for architecture</EventSubTitle>
        Pick the card , you interest in
      </EventBigTitle>
      <EventWrapper>
        {state.map((item) => {
          return (
            <Event
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
