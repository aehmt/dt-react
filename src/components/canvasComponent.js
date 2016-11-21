import React, { Component } from 'react'
import DefaultShape from './defaultShape'
import DefaultShapeDelete from './defaultShapeDelete'
import fetch from 'isomorphic-fetch'

const CanvasComponent = (props) => { 
    
  
    var rendered;
    if (props.shapes.length <= 20) {
      rendered = props.shapes.map((shape, i) => <DefaultShape xCo={shape[0]} yCo={shape[1]} color={shape[2]} key={i} pickedShape={props.pickedShape}/>)
    } else {
      rendered = props.shapes.map((shape, i) => {
        if (i < props.shapes.length - 20) {
          return <DefaultShape xCo={shape[0]} yCo={shape[1]} key={i} color={shape[2]} pickedShape={props.pickedShape} />
        } else {
          return <DefaultShapeDelete xCo={shape[0]} yCo={shape[1]} key={i} pickedShape={props.pickedShape}/>
        }
      })
    }
    return (
      <div id="painting">
        <canvas onMouseMove={props.onMove} id="ourCanvas" width="700" height="400" style={{backgroundColor: '#AAAAAA', borderRadius: 10, borderWidth: 0.5, borderColor: '#d6d7da'}}>
          {rendered}
        </canvas>
      </div>
    )
}

export default CanvasComponent;



