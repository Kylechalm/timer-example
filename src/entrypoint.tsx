import * as React from 'react'
import { render } from 'react-dom'
import { Timer, hourInMs } from '~/timer'

const maxDuration = hourInMs * 72;

render(
  <Timer 
    maxDuration={maxDuration}
    callback={() => console.log('wow')}
  />,
  document.getElementById('root')
)
