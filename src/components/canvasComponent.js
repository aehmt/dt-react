import React from 'react'
import DefaultShape from './defaultShape'
import DefaultShapeDelete from './defaultShapeDelete'
import fetch from 'isomorphic-fetch'

const CanvasComponent = (props) => {
  let rendered;
    if (props.shapes.length <= 20) {
      rendered = props.shapes.map((shape, i) => <DefaultShape xCo={shape[0]} yCo={shape[1]} key={i}/>)
    } else {
      rendered = props.shapes.map((shape, i) => {
        if (i < props.shapes.length - 20) {
          return <DefaultShape xCo={shape[0]} yCo={shape[1]} key={i} color={shape[2]} />
        } else {
          return <DefaultShapeDelete xCo={shape[0]} yCo={shape[1]} key={i}/>
        }
      })
    }
    return (
      <div id="painting">
        <canvas onMouseMove={props.onMove} id="ourCanvas" width="700" height="400" style={{backgroundColor: '#008811', borderRadius: 10, borderWidth: 0.5, borderColor: '#d6d7da', opacity: '0.75'}}>
          {rendered}
        </canvas>
      </div>
    )
  }

export default CanvasComponent
