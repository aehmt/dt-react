import React from 'react'
import CanvasComponent from './canvasComponent'
import { ChromePicker } from 'react-color'
import {Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle} from 'react-shapes';
import SaveButton from './SaveButton'
import Shapes from './shapes'

const socket = io();

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentMessage: 'meow',
      shapes: [],
      color: '#333333',
      APILoad: null,
      pickedShape: 'circle',
      startingData: null
    }
    socket.on('draw', (newDrawState) => this.handleStateChange(newDrawState));
    socket.on('message', (msg) => this.handleMessageChange(msg));
    socket.on('geteverything', this.sendLoad);
    this.handleClick = this.handleClick.bind(this);
    this.pickShape = this.pickShape.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.getLoad = this.getLoad.bind(this);
    this.sendLoad = this.sendLoad.bind(this);
  }
  componentWillMount() {
    fetch(`https://dry-fortress-11373.herokuapp.com/api/v1/artworks/${this.props.params.roomId}`)
      .then(res => res.json())
      .then(json => this.setState({
        APILoad: json.artwork.state})
      )
    let room = this.props.params.roomId;
    socket.on('connect', function() {
      socket.emit("subscribe", {room: room})
    })
    socket.emit('loadstuff')
    socket.on('loadstuff', (data) => this.getLoad(data))
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
  handleMessageChange(msg){
    this.setState({
      currentMessage: msg
    })
  }
  sendLoad(){
    let canvas = document.getElementById('ourCanvas');
    let imgData = canvas.toDataURL()
    socket.emit('loadstuff', imgData)
    this.setState({startingData: imgData })
  }
  getLoad(imgData){
    this.setState({
      startingData: imgData
    })
    let loadedImage = new Image()
    let databaseImage = new Image()
    loadedImage.src = this.state.startingData
    databaseImage.src = this.state.APILoad
    let canvas = document.getElementById('ourCanvas');
    let ctx = canvas.getContext('2d');
    ctx.drawImage(databaseImage, 0, 0)
    ctx.drawImage(loadedImage, 0, 0)
  }
  handleClick(ev){
    ev.preventDefault();
    if (ev.ctrlKey) {
      socket.emit('draw', [ev.pageX, ev.pageY-75, this.state.color]);
      let shapes = [...this.state.shapes, [ev.pageX, ev.pageY-75]]
      this.setState({
        shapes
      })
    }
  }
  handleColorChange(color, event) {
    this.setState({
      color: color.hex
    })
  }
  pickShape(event) {
    if (event.target.id === "star") {
      this.setState({
        pickedShape: "star"
      })
    }
    this.setState({
      pickedShape: event.target.childNodes[0].tagName
    })
  }

  handleMessage(ev){
    ev.preventDefault();
    let newMessage = ev.target.value;
    socket.emit('message', newMessage);
  }

  render () {
    return (
      <div>
        <h1>You are in room {this.props.params.roomId}</h1>
        <SaveButton roomId={this.props.params.roomId}/>
        <CanvasComponent onMove={this.handleClick} shapes={this.state.shapes} pickedShape={this.state.pickedShape}/> 
        <div id="message" onChange = {this.handleMessage}>
          <form id="messageForm">
            <input type="text" />
          </form>
          {this.state.currentMessage}
        </div>
        <ChromePicker color={this.state.color} onChange={this.handleColorChange} />
        <span onClick={(event)=>this.pickShape(event)} id="rectangle">
          <Rectangle width={40} height={40} fill={{color:'none'}} stroke={{color: this.state.color}} strokeWidth={2} />
        </span>
        <span onClick={(event)=>this.pickShape(event)} id="circle">
          <Circle r={20} fill={{color:'none'}} stroke={{color:this.state.color}} strokeWidth={2} />
        </span>
        <span onClick={(event)=>this.pickShape(event)} id="line">
          <Shapes color={this.state.color} />
        </span>
        <span onClick={(event)=>this.pickShape(event)} id="triangle">
          <Triangle width={40} height={40} fill={{color:'none'}} stroke={{color:this.state.color}} strokeWidth={2} />
        </span>
      </div>
    )
  }
}
