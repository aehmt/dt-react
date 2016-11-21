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
      APILoad: null,
    }
    socket.on('draw', (newDrawState) => this.handleStateChange(newDrawState));
    this.handleClick = this.handleClick.bind(this)
    this.pickShape = this.pickShape.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
    this.getLoad = this.getLoad.bind(this)
    this.sendLoad = this.sendLoad.bind(this)
    socket.on('geteverything', this.sendLoad)
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
    console.log(this.state)
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
  pickShape(event) {
    this.setState({
      pickedShape: event.target.childNodes[0].tagName
    })
  }

  render () {
    return (
      <div>
        <h1>You are in room {this.props.params.roomId}</h1>
        <SaveButton roomId={this.props.params.roomId}/>
        <CanvasComponent onMove={this.handleClick} shapes={this.state.shapes} />
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
