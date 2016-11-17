import React from 'react'
import CanvasComponent from './canvasComponent'
import { ChromePicker } from 'react-color'
const socket = io();

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      shapes: [],
      color: '#000000'
    }
    socket.on('connect', function() {
      console.log('Connected!')
    })
    socket.on('draw', (newDrawState) => this.handleStateChange(newDrawState));
    this.handleClick = this.handleClick.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
  }
  handleStateChange(newDrawState) {
    let shapes = [...this.state.shapes, newDrawState]
    if (shapes.length > 40) {
      shapes = shapes.slice(-40, shapes.length)
    }
    this.setState({
      shapes
    })
  }
  handleClick(ev){
    ev.preventDefault();
    socket.emit('draw', [ev.pageX, ev.pageY-55, this.state.color]);
    let shapes = [...this.state.shapes, [ev.pageX, ev.pageY-55]]
    
    this.setState({
      shapes
    })
  }
  handleColorChange(color, event) {
    this.setState({
      color: color.hex
    })
  }
  render () {
    return (
      <div>
        <h1>Change me!</h1>
        <CanvasComponent onMove={this.handleClick} shapes={this.state.shapes} />
        <ChromePicker color={this.state.color} onChange={this.handleColorChange} /> 
      </div>
    )
  }
}
