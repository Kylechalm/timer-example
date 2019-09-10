import * as React from "react";
import styled from "styled-components";
import Clock from "~/assets/icons/clock.svg";
import { lightBlue } from "~/assets/stylevars";
import { TimerContext } from "~/timer";
import { hourInMs, minuteInMs } from "~/timer/utils";
import { timeLeft } from "~/timer/utils";

const DisplayContainer = styled.div`
  border-radius: 5px;
  background: #1a1a1c;
  color: ${lightBlue};
  text-shadow: ${lightBlue} 1px 0 10px;
  display: flex;
  font-family: "DS-DIGI";
  height: 50%;
  justify-content: space-evenly;
  align-items: center;
  width: 65%;

  p,
  img {
    display: block;
    opacity: ${props => (props.displayOn ? 1 : 0)};
    transition: opacity 0.3s linear;
  }
`;

const ClockIcon = styled.img`
  height: 32px;
  width: 32px;
  filter: drop-shadow(0 0 10px lightBlue);

  _:-ms-fullscreen,
  & {
    margin-left: 25px;
  }
`;

const TimeLeft = styled.p`
  font-size: 24px;
  position: relative;
  -ms-flex: auto;
  text-transform: uppercase;
  text-align: right;
  width: 60%;

  _:-ms-fullscreen,
  & {
    margin-right: 25px;
  }

  &:before {
    content: "0000";
    color: black;
    opacity: 0.3;
    font-size: 48px;
    font-weight: bold;
    position: absolute;
    right: 35px;
    z-index: 0;
  }

  _:-ms-fullscreen,
  &:before {
    display: none;
  }

  strong {
    font-size: 48px;
    display: inline-flex;
    justify-content: space-evenly;
    position: relative;
    z-index: 1;
  }
`;

interface DisplayProps {
  displayOn: boolean;
}

export const Display = (props: DisplayProps) => {
  const context = React.useContext(TimerContext);
  const [displayTime, setDisplayTime] = React.useState(
    timeLeft(context.timer, context.timeScale)
  );
  const [updateDisplay, setUpdateDisplay] = React.useState(undefined);
  const timeScale = context.timeScale === minuteInMs ? " min" : "hrs";

  React.useEffect(() => {
    clearInterval(updateDisplay);
    setDisplayTime(timeLeft(context.timer, context.timeScale));

    setUpdateDisplay(
      setInterval(() => {
        setDisplayTime(timeLeft(context.timer, context.timeScale));
      }, 500)
    );

    return () => {
      clearInterval(updateDisplay);
    };
  }, [context]);

  return (
    <DisplayContainer displayOn={props.displayOn}>
      <ClockIcon src={Clock} />
      <TimeLeft>
        <strong>{displayTime}</strong>
        {timeScale}
      </TimeLeft>
    </DisplayContainer>
  );
};
