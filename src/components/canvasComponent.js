import React, { Component } from 'react'
import DefaultShape from './defaultShape'
import DefaultShapeDelete from './defaultShapeDelete'
import fetch from 'isomorphic-fetch'

class CanvasComponent extends Component {
  constructor(props) {
    super(props);
  }
    
  
  render() {
    var rendered;
    if (this.props.shapes.length <= 20) {
      rendered = this.props.shapes.map((shape, i) => <DefaultShape xCo={shape[0]} yCo={shape[1]} color={shape[2]} key={i} pickedShape={this.props.pickedShape}/>)
    } else {
      rendered = this.props.shapes.map((shape, i) => {
        if (i < this.props.shapes.length - 20) {
          return <DefaultShape xCo={shape[0]} yCo={shape[1]} key={i} color={shape[2]} pickedShape={this.props.pickedShape} />
        } else {
          return <DefaultShapeDelete xCo={shape[0]} yCo={shape[1]} key={i} pickedShape={this.props.pickedShape}/>
        }
      })
    }
    return (
      <div id="painting">
        <canvas onMouseMove={this.props.onMove} id="ourCanvas" width="700" height="400" style={{backgroundColor: '#AAAAAA', borderRadius: 10, borderWidth: 0.5, borderColor: '#d6d7da'}}>
          {rendered}
        </canvas>
      </div>
    )
  }
}

export default CanvasComponent;



