import React from 'react'
import CanvasComponent from './canvasComponent'

export default class App extends React.Component {
  render () {
    const rndRooms = ["artsy", "bznz", "slinkerbell"]
    let room = rndRooms[Math.floor(Math.random()*3)];
    return (
      <div>
        <h1>You are in room {room}</h1>
        <CanvasComponent room={room}/>
      </div>
    )
  }
}
