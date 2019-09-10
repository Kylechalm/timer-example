import * as React from "react";
import styled from "styled-components";
import { TimerContext } from "~/timer";
import { Button } from "~/assets/stylevars";
import Up from "~/assets/icons/up.svg";
import Down from "~/assets/icons/down.svg";

const StepControlContainer = styled.div`
  background: #29292a;
  border-radius: 5px;
  display: flex;
  padding: 2.5px;
`;

const StepControlButton = styled(Button)`
  margin: 2.5px;
`;

const ButtonLabel = styled.img`
  height: 18px;
  width: 18px;
  padding: 2px;
`;

interface StepControlProps {}

export const StepControl = (props: StepControlProps) => {
  const context = React.useContext(TimerContext);

  const handleClick = actionType => {
    context.updateTimer({
      type: actionType,
      payload: context
    });
  };

  return (
    <StepControlContainer>
      <StepControlButton onClick={() => handleClick("increment")}>
        <ButtonLabel src={Up} />
      </StepControlButton>
      <StepControlButton onClick={() => handleClick("decrement")}>
        <ButtonLabel src={Down} />
      </StepControlButton>
    </StepControlContainer>
  );
};
