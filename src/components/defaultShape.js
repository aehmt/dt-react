import React from 'react'

export default function DefaultShape(props){
  var c = document.getElementById("ourCanvas");
  var ctx = c.getContext("2d");
  var x = props.xCo
  var y = props.yCo
  // console.log(x,y)
  // console.log(props.pickedShape)
    switch (props.pickedShape) {
      case 'circle':
        return (
          <div>
            {ctx.beginPath()}
            {ctx.strokeStyle=props.color}
            {ctx.arc(props.xCo,props.yCo,20,0,2*Math.PI)}
            {ctx.stroke()}
          </div>
        )
      case 'rect':
        return (
          <div>
            {ctx.beginPath()}
            {ctx.strokeStyle=props.color}
            {ctx.rect(x-20,y-20,40,40)}
            {ctx.stroke()}
          </div>
        )
      case 'polygon':
        return (
          <div>
            {ctx.beginPath()}
            {ctx.strokeStyle=props.color}
            {ctx.moveTo(x-20, y-20)}
            {ctx.lineTo(x-20, y)}
            {ctx.lineTo(x, y)}
            {ctx.closePath()}
            {ctx.stroke()}
          </div>
        )
      case 'polygon':
        return (
          <div>
            {ctx.beginPath()}
            {ctx.strokeStyle=props.color}
            {ctx.moveTo(x-20, y-20)}
            {ctx.lineTo(x-20, y)}
            {ctx.lineTo(x, y)}
            {ctx.closePath()}
            {ctx.stroke()}
          </div>
        )
        break;
    }
}

