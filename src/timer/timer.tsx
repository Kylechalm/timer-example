import * as React from 'react';
import styled from 'styled-components';
import { Display } from './display';
import { Button, GlobalStyle } from '~/assets/stylevars';
import { StepControl, RangeControl } from './controls';

export const minuteInMs = 60 * 1000;
export const hourInMs = minuteInMs * 60;

interface Timer {
  duration: number;
  start: Date;
}

//type TimeScale = minuteInMs | hourInMs;
type TimeScale = 60000 | 3600000;

const timerReducer = (timer, action) => {
  const maxDuration = action.payload.maxDuration;
  
  switch(action.type) {
    case 'increment':
      const increment = timer.duration + action.payload.timeScale;

      return {
        duration: increment > maxDuration ? maxDuration : increment,
        start: new Date(),
      }
    case 'decrement':
      const decrement = timer.duration - action.payload.timeScale;
      
      return {
        duration: decrement < 0 ? 0 : decrement,
        start: new Date(),
      }
    case 'set':
      return {
        duration: action.payload.duration,
        start: new Date(),
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
}

export const TimerContext = React.createContext({
  timer: initTimer,
  timeScale: minuteInMs,
  updateTimer: undefined,
  maxDuration: undefined,
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
      <TimerContext.Provider value={{timer, timeScale, updateTimer: dispatch, maxDuration: props.maxDuration}}>
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
