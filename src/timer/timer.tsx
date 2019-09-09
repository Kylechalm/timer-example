import * as React from 'react';
import styled from 'styled-components';
import { Display } from './display';
import { Button, GlobalStyle } from '~/assets/stylevars';
import { StepControl } from './controls/step-control';

export const minuteInMs = 60 * 1000;
export const hourInMs = minuteInMs * 60;

interface Timer {
  duration: number;
  start: Date;
}

//type TimeScale = minuteInMs | hourInMs;
type TimeScale = 60000 | 3600000;

const timerReducer = (timer, action) => {
  console.log(timer, action);

  switch(action.type) {
    case 'increment':
      const increment = action.payload.timeScale;

      return {
        duration: timer.duration + increment,
        start: new Date(),
      }
    case 'decrement':
      const decrement = action.payload.timeScale;

      return {
        duration: timer.duration - decrement,
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 175px;
  width: 300px;
`;

const initTimer = {
  duration: 0,
  start: new Date(),
}

export const TimerContext = React.createContext({
  timer: initTimer,
  timeScale: minuteInMs,
  updateTimer: undefined,
});

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
      <TimerContext.Provider value={{timer, timeScale, updateTimer: dispatch}}>
        <Display 
          displayOn={displayOn}
        />
        <StepControl />
        <h1 onClick={() => toggleTimeScale()}>{timeScale}</h1>
        <Button onClick={() => toggleDisplay()}>PWR</Button>
      </TimerContext.Provider>
    </TimerContainer>
  )
}
