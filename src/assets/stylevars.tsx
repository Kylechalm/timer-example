import styled, { css, createGlobalStyle } from 'styled-components';
import DSDIGI from '~/assets/fonts/DS-DIGI.TTF';
import DSDIGIB from '~/assets/fonts/DS-DIGIB.TTF';
import DSDIGII from '~/assets/fonts/DS-DIGII.TTF';
import DSDIGIT from '~/assets/fonts/DS-DIGIT.TTF';

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

export const slategray = 'gray';
export const lightBlue = 'lightblue';

export const Button = styled.button`
  display: inline-block;
  border: none;
  padding: 1rem 2rem;
  margin: 0;
  text-decoration: none;
  background: #0069ed;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, 
              transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:hover,
  &:focus {
      background: #0053ba;
  }

  &:focus {
      outline: 1px solid #fff;
      outline-offset: -4px;
  }

  &:active {
      transform: scale(0.99);
  }
`;
