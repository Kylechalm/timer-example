import * as React from 'react';
import styled from 'styled-components';
import { Display } from './display';
import { Button, GlobalStyle } from '~/assets/stylevars';
import { StepControl, RangeControl } from './controls';
import { minuteInMs, hourInMs, timeLeft } from './utils';

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
  
  switch(action.type) {
    case 'increment':
      const increment = durationLeft + action.payload.timeScale;

      newDuration = increment > maxDuration ? maxDuration : increment;

      return {
        duration: newDuration,
        start: new Date(),
        timeout: setTimeout(() => action.payload.callback(), newDuration),
      }
    case 'decrement':
      const decrement = durationLeft - action.payload.timeScale;
      
      newDuration = decrement < 0 ? 0 : decrement;

      return {
        duration: newDuration,
        start: new Date(),
        timeout: setTimeout(() => action.payload.callback(), newDuration),
      }
    case 'set':
      return {
        duration: action.payload.duration,
        start: new Date(),
        timeout: setTimeout(() => action.payload.callback(), action.payload.duration),
      }
    default:
      throw new Error('What did you do?');
  }
}

const TimerContainer = styled.div`
  align-items: center;
  box-shadow: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 200px;
  width: 450px;
`;

const initTimer = {
  duration: 0,
  start: new Date(),
  timeout: undefined,
}

export const TimerContext = React.createContext({
  timer: initTimer,
  timeScale: minuteInMs,
  updateTimer: undefined,
  maxDuration: undefined,
  callback: undefined,
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
  }

  const toggleDisplay = () => {
    setDisplayOn(!displayOn);
  }

  return (
    <TimerContainer>
      <GlobalStyle />
      <TimerContext.Provider value={{timer, timeScale, updateTimer: dispatch, ...props}}>
        <Display 
          displayOn={displayOn}
        />
        <StepControl />
        <h1 onClick={() => toggleTimeScale()}>{timeScale}</h1>
        <Button onClick={() => toggleDisplay()}>PWR</Button>
        <RangeControl maxDuration={props.maxDuration} />
      </TimerContext.Provider>
    </TimerContainer>
  )
}
