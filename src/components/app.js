import React from 'react'
import CanvasComponent from './canvasComponent'
import { ChromePicker } from 'react-color'
import SaveButton from './SaveButton'
import {Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle} from 'react-shapes';
const socket = io();

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      shapes: [],
      color: '#000000',
      startingData: null,
      pickedShape: 'circle'
    }
    socket.on('draw', (newDrawState) => this.handleStateChange(newDrawState));
    this.handleClick = this.handleClick.bind(this)
    this.pickShape = this.pickShape.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
    this.getLoad = this.getLoad.bind(this)
    this.sendLoad = this.sendLoad.bind(this)
    socket.on('geteverything', this.sendLoad)
    if (!(this.state.startingData)){
      socket.on('loadstuff', (data) => this.getLoad(data))
    }
  }
  componentWillMount() {
    let room = this.props.room;
    socket.on('connect', function() {
      socket.emit("subscribe", {room: room})
    })
    this.requestImage
  }
  handleStateChange(newDrawState) {
    let shapes = [...this.state.shapes, newDrawState]
    if (shapes.length > 2) {
      shapes = shapes.slice(-2, shapes.length)
    }
    this.setState({
      shapes
    })
  }
  sendLoad(){
    let canvas = document.getelementbyid('ourcanvas');
    let imgdata = canvas.todataurl()
    socket.emit('loadstuff', imgData)
    this.setState({startingData: imgData })
  }
  getLoad(imgData){
    this.setState({
      startingData: imgData
    })
    let loadedImage = new Image()
    loadedImage.src = this.state.startingData
    let canvas = document.getElementById('ourCanvas');
    let ctx = canvas.getContext('2d');
    ctx.drawImage(loadedImage, 0, 0) 
  } 
  handleClick(ev){
    ev.preventDefault();

    socket.emit('draw', [ev.screenX, ev.screenY-200, this.state.color]);
    let shapes = [...this.state.shapes, [ev.screenX, ev.screenY-200]]

    this.setState({
      shapes
    })
  }
  handleColorChange(color, event) {
    this.setState({
      color: color.hex
    })
  }
  pickShape(event) {
    this.setState({
      pickedShape: event.target.childNodes[0].tagName
    })
  }

  render () {
    return (
      <div>
        <h1>You are in room {this.props.room}</h1>
        <SaveButton /> 
        <CanvasComponent onMove={this.handleClick} shapes={this.state.shapes} pickedShape={this.state.pickedShape}/>
        <ChromePicker color={this.state.color} onChange={this.handleColorChange} />
        <span onClick={(event)=>this.pickShape(event)} id="rectangle">
          <Rectangle width={40} height={40} fill={{color:'none'}} stroke={{color: this.state.color}} strokeWidth={2} />
        </span>
        <span onClick={(event)=>this.pickShape(event)} id="circle">
          <Circle r={20} fill={{color:'none'}} stroke={{color:this.state.color}} strokeWidth={2} />
        </span>
        <span onClick={(event)=>this.pickShape(event)} id="ellipse">
          <Ellipse rx={30} ry={15} fill={{color:'none'}} stroke={{color:this.state.color}} strokeWidth={2} />
        </span>
        <span onClick={(event)=>this.pickShape(event)} id="line">
          <Line x1={25} x2={55} y1={25} y2={55}  stroke={{color:this.state.color}} strokeWidth={2} />
        </span>
        <span onClick={(event)=>this.pickShape(event)} id="triangle">
          <Triangle width={40} height={40} fill={{color:'none'}} stroke={{color:this.state.color}} strokeWidth={2} />
        </span>
      </div>
    )
  }
}
