import React from 'react'
import CanvasComponent from './canvasComponent'
import { ChromePicker } from 'react-color'
import SaveButton from './SaveButton'

const socket = io();

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      shapes: [],
      color: '#000000',
      APILoad: null,
      startingData: null
    }
    socket.on('draw', (newDrawState) => this.handleStateChange(newDrawState));
    this.handleClick = this.handleClick.bind(this)
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
    if (shapes.length > 40) {
      shapes = shapes.slice(-40, shapes.length)
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
  render () {
    return (
      <div id="inroom">
        <h2>Now drawing in: Room {this.props.params.roomId}</h2>
        <p>To draw, press the ctrl key. Click on the desired shape to draw in that shape. </p> 
        <SaveButton roomId={this.props.params.roomId}/>
        <div className="wrapper">
        <CanvasComponent onMove={this.handleClick} shapes={this.state.shapes} />
        <ChromePicker color={this.state.color} onChange={this.handleColorChange} />
      </div>
      </div>
    )
  }
}
