import * as React from 'react'
import { render } from 'react-dom'
import { Timer } from '~/timer'
import { hourInMs } from '~/timer/utils';

const maxDuration = hourInMs * 72;

render(
  <Timer 
    maxDuration={maxDuration}
    callback={() => console.log('wow')}
  />,
  document.getElementById('root')
)
