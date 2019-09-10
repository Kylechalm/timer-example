import * as React from "react";
import styled from "styled-components";
import { TimerContext } from "~/timer";
import { lightBlue } from "~/assets/stylevars";

const RangeControlContainer = styled.div`
  width: 60%;
`;

const RangeControlInput = styled.input`
  width: 100%;
  background: transparent;
  -webkit-appearance: none;
  margin-bottom: 10px;
  width: 100%;

  _:-ms-fullscreen,
  & {
    margin-bottom: -15px;
  }

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: ${lightBlue};
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }

  &::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -7px;
  }

  &:focus::-webkit-slider-runnable-track {
    background: ${lightBlue};
  }

  &::-moz-range-track {
    width: 100%;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: ${lightBlue};
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }

  &::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
  }

  &::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }

  &::-ms-fill-lower {
    background: #2a6495;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }

  &::-ms-fill-upper {
    background: #3071a9;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }

  &::-ms-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
  }

  &:focus::-ms-fill-lower {
    background: #3071a9;
  }

  &:focus::-ms-fill-upper {
    background: #367ebd;
  }
`;

const TickMarkContainer = styled.ul`
  display: flex;
  height: 0.5em;
  justify-content: space-evenly;
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
  left: 4px;

  _:-ms-fullscreen,
  & {
    display: none;
  }

  li {
    height: 50%;
    border: 0.5px solid gray;
    -ms-flex: auto;

    &:nth-child(5n + 1) {
      height: 100%;
    }
  }
`;

let tickMarks = [];

for (let index = 0; index < 56; index++) {
  tickMarks[index] = <li key={index} />;
}

interface RangeControlProps {}

export const RangeControl = (props: RangeControlProps) => {
  const context = React.useContext(TimerContext);
  const [rangeValue, setRangeValue] = React.useState(context.timer.duration);

  const handleChange = event => {
    const targetValue = parseInt(event.target.value, 10);

    if (targetValue !== NaN) {
      setRangeValue(event.target.value);
      context.updateTimer({
        type: "set",
        payload: {
          duration: targetValue,
          ...context
        }
      });
    }
  };

  return (
    <RangeControlContainer>
      <RangeControlInput
        type="range"
        onChange={handleChange}
        value={rangeValue}
        max={context.maxDuration}
      />
      <TickMarkContainer>{tickMarks}</TickMarkContainer>
    </RangeControlContainer>
  );
};
