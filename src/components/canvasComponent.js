import React, { Component } from 'react'
import DefaultShape from './defaultShape'
import DefaultShapeDelete from './defaultShapeDelete'
import fetch from 'isomorphic-fetch'

const CanvasComponent = (props) => { 
    
    var rendered;
    console.log(props.shapes)
    if (props.shapes.length <= 20) {
      rendered = props.shapes.map((shape, i) => <DefaultShape xCo={shape[0]} yCo={shape[1]} color={shape[2]} key={i} pickedShape={shape[3]}/>)
    } 
    return (
      <div id="painting">
        <canvas onMouseMove={props.onMove} id="ourCanvas" width="925" height="500" style={{backgroundColor: '#AAAAAA', borderRadius: 10, borderWidth: 0.5, borderColor: '#d6d7da'}}>
          {rendered}
        </canvas>
      </div>
    )
}

export default CanvasComponent;



