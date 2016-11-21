import React from 'react'
import CanvasComponent from './canvasComponent'
import { ChromePicker } from 'react-color'
import {Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle} from 'react-shapes';
import SaveButton from './SaveButton'
import Shapes from './shapes'
import CustomPicker from './CustomPicker'

const socket = io();

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentMessage: 'meow',
      shapes: [],
      color: '#995599',
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
       socket.emit('draw', [ev.clientX-20, ev.clientY-340, this.state.color]);
       let shapes = [...this.state.shapes, [ev.clientX-20, ev.clientY-340]]
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
    } else {
      this.setState({
        pickedShape: event.target.childNodes[0].tagName
      })
    }

  }


  handleMessage(ev){
    ev.preventDefault();
    let newMessage = ev.target.value;
    socket.emit('message', newMessage);
  }

  render () {
    return (
      <div id="inroom">
        <h2>Now drawing in: Room {this.props.params.roomId}</h2>
        <p>To draw, press the ctrl key. Click on the desired shape to draw in that shape. </p>
        <SaveButton roomId={this.props.params.roomId}/>

        <div className="wrapper">
        <CanvasComponent onMove={this.handleClick} shapes={this.state.shapes} pickedShape={this.state.pickedShape}/>
      <div id="colorposition">
        <div id="message" onKeyUp = {this.handleMessage}>
          <textarea id="messageForm" rows="2" cols="40" />
          <div id="current" >
            {this.state.currentMessage}
          </div>
        </div>
        Brush color:
        <CustomPicker color={this.state.color} onChange={this.handleColorChange} />
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
      </div>
      </div>
    )
  }
}
