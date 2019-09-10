import styled, { css, createGlobalStyle } from "styled-components";
import DSDIGI from "~/assets/fonts/DS-DIGI.TTF";
import DSDIGIB from "~/assets/fonts/DS-DIGIB.TTF";
import DSDIGII from "~/assets/fonts/DS-DIGII.TTF";
import DSDIGIT from "~/assets/fonts/DS-DIGIT.TTF";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'DS-DIGI';
    src: url('${DSDIGI}') format('truetype');
  }
  @font-face {
    font-family: 'DS-DIGI';
    font-weight: bold;
    src: url('${DSDIGIB}') format('truetype');
  }
  @font-face {
    font-family: 'DS-DIGI';
    font-style: italic;
    src: url('${DSDIGII}') format('truetype');
  }
  @font-face {
    font-family: 'DS-DIGI';
    font-style: italic;
    font-weight: bold;
    src: url('${DSDIGIT}') format('truetype');
  }
`;

export const slategray = "gray";
export const lightBlue = "#b0ffff";

export const Button = styled.button`
  box-shadow: inset 0px 1px 0px 0px #747474;
  background: linear-gradient(to bottom, #3d3d3d 5%, #2e2e2f 100%);
  background-color: #3d3d3d;
  border-radius: 6px;
  border: 1px solid #3d3d3d;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 12px;
  font-weight: bold;
  padding: 3px 5px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #747474;

  &:hover,
  &:focus {
    background: linear-gradient(to bottom, #2e2e2f 5%, #3d3d3d 100%);
    background-color: #2e2e2f;
  }

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.99);
  }
`;
