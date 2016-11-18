import React from 'react'
import { render } from 'react-dom'
import App from './components/app'
import routes from './routes'
import { Router, browserHistory } from 'react-router'

const rndRooms = ["artsy", "bznz", "slinkerbell"]
let room = rndRooms[Math.floor(Math.random()*3)];

render(<Router history={browserHistory} routes={routes} />, document.getElementById('main'))
