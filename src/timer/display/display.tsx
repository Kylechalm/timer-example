import * as React from 'react';
import styled from 'styled-components';
import Clock from '~/assets/icons/clock.svg'; 
import { lightBlue } from '~/assets/stylevars';
import { TimerContext, hourInMs, minuteInMs } from '~/timer';

const DisplayContainer = styled.div`
  color: ${lightBlue};
  display: ${props => props.display ? 'flex' : 'none'};
  font-family: 'DS-DIGI';
  justify-content: space-between;
  align-items: center;
`;

const ClockIcon = styled.img`
  height: 32px;
  width: 32px;
`;

const TimeLeft = styled.p`
  font-size: 24px;
  text-transform: uppercase;
  
  strong {
    font-size: 48px;
  } 
`;

const msToMinutes = (ms: number) => Math.round(ms / (60 * 1000));
const msToHours = (ms: number) => Math.round(ms / ((60 * 60) * 1000));

const timeLeft = (timer, timeScale) => {
  const timeLeftInMs = timer.duration - (Date.now() - timer.start.getTime());

  if (Math.sign(timeLeftInMs) === -1) return 0;
  
  if (timeScale === minuteInMs) {
    return msToMinutes(timeLeftInMs);
  } else {
    return msToHours(timeLeftInMs);
  }
}

export const Display = (props: any) => {
  const context = React.useContext(TimerContext);
  const timeScale = context.timeScale === minuteInMs ? 'min' : 'hrs';

  return (
    <DisplayContainer display={props.displayOn}>
       <ClockIcon src={Clock} /> 
       <TimeLeft>
         <strong>
           {timeLeft(context.timer, context.timeScale)}
         </strong>{timeScale}
       </TimeLeft>
    </DisplayContainer>
  )
}
