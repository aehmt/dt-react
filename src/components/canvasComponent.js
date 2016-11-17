import React from 'react'
import DefaultShape from './defaultShape'
import DefaultShapeDelete from './defaultShapeDelete'
import fetch from 'isomorphic-fetch'
const socket = io();

///import other canvas elements as components or stateless functions

export default class CanvasComponent extends React.Component {
  constructor(){
    super();
    this.state = {
      shapes: []
    }
    this.handleClick = this.handleClick.bind(this)
    socket.on('connect', function() {
      console.log('Connected!')
    })
    // debugger;
    socket.on('draw', (newDrawState) => this.handleStateChange(newDrawState));
  }

 handleStateChange(newDrawState) {
    // debugger;
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
    socket.emit('draw', [ev.pageX, ev.pageY-55]);
    let shapes = [...this.state.shapes, [ev.pageX, ev.pageY-55]]

    this.setState({
      shapes
    })
    // console.log(this.state.shapes);
  }


render(){
    let rendered;
    if (this.state.shapes.length <= 20) {
      rendered = this.state.shapes.map((shape, i) => <DefaultShape xCo={shape[0]} yCo={shape[1]} key={i}/>)
    } else {
      rendered = this.state.shapes.map((shape, i) => {
        if (i < this.state.shapes.length - 20) {
          return <DefaultShape xCo={shape[0]} yCo={shape[1]} key={i}/>
        } else {
          return <DefaultShapeDelete xCo={shape[0]} yCo={shape[1]} key={i}/>
        }
      })
    }
    return (
      <div id="painting">
        <canvas onMouseMove={this.handleClick} id="ourCanvas" width="700" height="400" style={{backgroundColor: '#008811', borderRadius: 10, borderWidth: 0.5, borderColor: '#d6d7da', opacity: '0.75'}}>
          {rendered}
        </canvas>
      </div>
    )
  }
}
