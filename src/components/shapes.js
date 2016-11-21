import React from 'react'
import Ninja from './shapes/ninja'

const Shapes = (props) => {
  let ninja;
  if (document.getElementById("star")) {
    ninja = <Ninja color={props.color} />
  } 
  return (
    <canvas id="star" width="40" height="40" style={{backgroundColor: 'white'}}>
      {ninja}
    </canvas>
  )
}

export default Shapes;
