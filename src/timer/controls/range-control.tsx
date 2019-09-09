import * as React from 'react';
import styled from 'styled-components';
import { TimerContext } from '~/timer';
import { throttle } from 'lodash';

const RangeControlContainer = styled.div`
  width: 100%;
`;

const RangeControlInput = styled.input`
  width: 100%;
`;

const TickMarkContainer = styled.ul`
  display: flex;
  height: .5em;
  justify-content: space-evenly;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    height: 50%;
    border: 1px solid white;

    &:nth-child(5n + 1) {
      height: 100%;
    }
  }
`;

const tickMarks = Array(56).fill(<li />);

export const RangeControl = (props: any) => {
  const context = React.useContext(TimerContext);
  const [rangeValue, setRangeValue] = React.useState(context.timer.duration);

  const handleChange = event => {
    const targetValue = parseInt(event.target.value, 10);

    if (targetValue !== NaN) {
      setRangeValue(event.target.value);
      context.updateTimer({
        type: 'set',
        payload: {
          duration: targetValue,
          maxDuration: context.maxDuration,
        }
      });
    }
  }

  return (
    <RangeControlContainer>
      <RangeControlInput type="range" onChange={handleChange} value={rangeValue} max={props.maxDuration}/>
      <TickMarkContainer>
        {tickMarks}
      </TickMarkContainer>
    </RangeControlContainer>
  )
}
