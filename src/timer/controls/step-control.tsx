import * as React from 'react';
import styled from 'styled-components';
import { TimerContext } from '~/timer';
import { Button } from '~/assets/stylevars';
import Up from '~/assets/icons/up.svg';
import Down from '~/assets/icons/down.svg';

const StepControlContainer = styled.div`
  display: flex;
`;

const ButtonLabel = styled.img`
  height: 24px;
  width: 24px;
`;

export const StepControl = (props: any) => {
  const context = React.useContext(TimerContext);
  
  const handleClick = (actionType) => {
    context.updateTimer({
      type: actionType,
      payload: {
        timeScale: context.timeScale,
      }
    })
  }
  
  return (
    <StepControlContainer>
      <Button><ButtonLabel src={Up} onClick={() => handleClick('increment')}/></Button>
      <Button><ButtonLabel src={Down} onClick={() => handleClick('decrement')}/></Button>
    </StepControlContainer>
  )
};
