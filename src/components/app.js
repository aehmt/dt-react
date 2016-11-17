import React from 'react'
import CanvasComponent from './canvasComponent'
import { ChromePicker } from 'react-color'
const socket = io();

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      shapes: [],
      color: '#000000',
      startingData: null
    }
    socket.on('draw', (newDrawState) => this.handleStateChange(newDrawState));
    let room = this.props.room;
    socket.on('connect', function() {
      socket.emit("subscribe", {room: room})
    })
    this.handleClick = this.handleClick.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
    this.getLoad = this.getLoad.bind(this)
    if (this.state.startingData) {
      socket.on('geteverything', console.log('hello'))
    }
    socket.on('loadstuff', (data) => console.log(data))
  }
  componentDidMount() {
      let loadedImage = new Image()
      loadedImage.src = this.state.startingData
      let canvas = document.getElementById('ourCanvas');
      let ctx = canvas.getContext('2d');
      ctx.drawImage(loadedImage, 0, 0) 
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
  sendLoad(){
    console.log('hello from sendload')
    let canvas = document.getElementById('ourCanvas');
    let imgData = canvas.toDataURL()
    console.log(imgData)
    socket.emit('loadstuff', imgData)
  }
  getLoad(imgData){
    console.log(imgData)
    this.setState({
      startingData: imgData
    })
  } 
  handleClick(ev){
    ev.preventDefault();
    socket.emit('draw', [ev.pageX, ev.pageY-75, this.state.color]);
    let shapes = [...this.state.shapes, [ev.pageX, ev.pageY-75]]

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
        <h1>You are in room {this.props.room}</h1>
        <CanvasComponent onMove={this.handleClick} shapes={this.state.shapes} />
        <ChromePicker color={this.state.color} onChange={this.handleColorChange} />
      </div>
    )
  }
}
