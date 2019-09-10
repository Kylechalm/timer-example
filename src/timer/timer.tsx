import * as React from "react";
import styled, { css } from "styled-components";
import { Display } from "./display";
import { Button, GlobalStyle, lightBlue } from "~/assets/stylevars";
import { StepControl, RangeControl } from "./controls";
import { minuteInMs, hourInMs, timeLeft } from "./utils";

interface Timer {
  duration: number;
  start: Date;
}

//type TimeScale = minuteInMs | hourInMs;
type TimeScale = 60000 | 3600000;

const timerReducer = (timer, action) => {
  clearTimeout(timer.timeout);
  let newDuration;
  const maxDuration = action.payload.maxDuration;
  const durationLeft = timeLeft(timer, 1);

  switch (action.type) {
    case "increment":
      const increment = durationLeft + action.payload.timeScale;

      newDuration = increment > maxDuration ? maxDuration : increment;

      return {
        duration: newDuration,
        start: new Date(),
        timeout: setTimeout(() => action.payload.callback(), newDuration)
      };
    case "decrement":
      const decrement = durationLeft - action.payload.timeScale;

      newDuration = decrement < 0 ? 0 : decrement;

      return {
        duration: newDuration,
        start: new Date(),
        timeout: setTimeout(() => action.payload.callback(), newDuration)
      };
    case "set":
      return {
        duration: action.payload.duration,
        start: new Date(),
        timeout: setTimeout(
          () => action.payload.callback(),
          action.payload.duration
        )
      };
    default:
      throw new Error("What did you do?");
  }
};

const TimerContainer = styled.div`
  align-items: center;
  box-shadow: 0px 0px 10px black;
  background: #303030;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 180px;
  width: 320px;
`;

const SideControlContianer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50%;
`;

const PowerButton = styled(Button)`
  align-items: center;
  display: inline-flex;
  justify-content: space-evenly;
  padding: 6px 10px;
`;

const PowerLight = styled.span`
  color: white;
  font-size: 28px;
  line-height: 24px;
  text-shadow: transparent;
  transition: all 0.3s linear;

  ${props => {
    if (props.displayOn) {
      return css`
        color: ${lightBlue};
        text-shadow: ${lightBlue} 1px 0 10px;
      `;
    }
  }}
`;

const BottomControlContianer = styled.div`
  align-items: center;
  display: flex;
  height: 30%;
  justify-content: space-around;
  width: 90%;
`;

const TimeScaleToggle = styled.div`
  background: #2a2a2b;
  border-radius: 20px;
  display: flex;
  justify-content: ${props =>
    props.timeScale === minuteInMs ? "flex-start" : "flex-end"};
  margin: 0 20px;
  position: relative;
  width: 35px;

  &:before {
    content: "MIN";
    color: gray;
    font-family: sans-serif;
    font-size: 12px;
    position: absolute;
    left: -30px;
    top: 2.5px;
  }
  &:after {
    content: "HRS";
    color: gray;
    font-family: sans-serif;
    font-size: 12px;
    position: absolute;
    right: -30px;
    top: 2.5px;
  }
`;

const ToggleCircle = styled.span`
  background: white;
  border: 1px solid white;
  border-radius: 50%;
  display: block;
  height: 15px;
  width: 15px;
`;

const initTimer = {
  duration: 0,
  start: new Date(),
  timeout: undefined
};

export const TimerContext = React.createContext({
  timer: initTimer,
  timeScale: minuteInMs,
  updateTimer: undefined,
  maxDuration: undefined,
  callback: undefined
});

interface TimerProps {
  maxDuration: number;
  callback?: Function;
}

export const Timer = (props: any) => {
  const [displayOn, setDisplayOn] = React.useState(false);
  const [timeScale, setTimeScale] = React.useState(minuteInMs);
  const [timer, dispatch] = React.useReducer(timerReducer, initTimer);

  const toggleTimeScale = () => {
    if (timeScale === minuteInMs) {
      setTimeScale(hourInMs);
    } else {
      setTimeScale(minuteInMs);
    }
  };

  const toggleDisplay = () => {
    setDisplayOn(!displayOn);
  };

  return (
    <TimerContainer>
      <GlobalStyle />
      <TimerContext.Provider
        value={{ timer, timeScale, updateTimer: dispatch, ...props }}
      >
        <Display displayOn={displayOn} />
        <SideControlContianer>
          <StepControl />
          <PowerButton onClick={() => toggleDisplay()}>
            <PowerLight displayOn={displayOn}>•</PowerLight> PWR
          </PowerButton>
        </SideControlContianer>
        <BottomControlContianer>
          <TimeScaleToggle
            timeScale={timeScale}
            onClick={() => toggleTimeScale()}
          >
            <ToggleCircle />
          </TimeScaleToggle>
          <RangeControl maxDuration={props.maxDuration} />
        </BottomControlContianer>
      </TimerContext.Provider>
    </TimerContainer>
  );
};
