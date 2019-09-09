import * as React from 'react';
import styled from 'styled-components';
import Clock from '~/assets/icons/clock.svg'; 
import { lightBlue } from '~/assets/stylevars';
import { TimerContext } from '~/timer';
import { hourInMs, minuteInMs } from '~/timer/utils';
import { timeLeft } from '~/timer/utils';

const DisplayContainer = styled.div`
  color: ${lightBlue};
  display: ${props => props.displayOn ? 'flex' : 'none'};
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

export const Display = (props: any) => {
  const context = React.useContext(TimerContext);
  const [displayTime, setDisplayTime] = React.useState(timeLeft(context.timer, context.timeScale));
  const [updateDisplay, setUpdateDisplay] = React.useState(undefined);
  const timeScale = context.timeScale === minuteInMs ? 'min' : 'hrs';

  React.useEffect(() => {
    clearInterval(updateDisplay);
    setDisplayTime(timeLeft(context.timer, context.timeScale));

    setUpdateDisplay(
      setInterval(() => {
        setDisplayTime(timeLeft(context.timer, context.timeScale))
      }, 1000)
    )

    return () => {
      clearInterval(updateDisplay);
    }
  }, [context])
  
  return (
    <DisplayContainer displayOn={props.displayOn}>
       <ClockIcon src={Clock} /> 
       <TimeLeft>
         <strong>
           {displayTime}
         </strong>{timeScale}
       </TimeLeft>
    </DisplayContainer>
  )
}
