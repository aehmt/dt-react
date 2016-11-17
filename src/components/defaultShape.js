import React from 'react'

export default function DefaultShape(props){
  var c = document.getElementById("ourCanvas");
  var ctx = c.getContext("2d");
  return (
    <div>
    {ctx.beginPath()}
    {ctx.strokeStyle=props.color}
    {ctx.arc(props.xCo,props.yCo,20,0,2*Math.PI)}
    {ctx.stroke()}
    </div>
  )
}
