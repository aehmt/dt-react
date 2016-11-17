import React from 'react'

export default function DefaultShapeDelete(props){
  var c = document.getElementById("ourCanvas");
  var ctx = c.getContext("2d");
  return (
    <div>
      {ctx.beginPath()}
      {ctx.strokeStyle="blue"}
      {ctx.arc(props.xCo,props.yCo,20,0,2*Math.PI)}
      {ctx.stroke()}
    </div>
  )
}
