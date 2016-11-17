import React from 'react'
import { render } from 'react-dom'
import App from './components/app'

const rndRooms = ["artsy", "bznz", "slinkerbell"]
let room = rndRooms[Math.floor(Math.random()*3)];

render(<App room={room}/>, document.getElementById('main'))
