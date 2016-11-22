import React from 'react'

CanvasRenderingContext2D.prototype.star = function (x,y,r,ratio,n,t){
   var m = t + Math.PI * 2;
   var px = x - r * Math.sin(t);
   var py = y - r * Math.cos(t);
   var dt = Math.PI / n;
   this.beginPath();
   this.moveTo(px, py);
   t += dt ;
   px = x - ratio * r * Math.sin(t);
   py = y - ratio * r * Math.cos(t);
   t += dt;
   this.lineTo(px, py);
   while (t < m) {
       px = x - r * Math.sin(t);
       py = y - r * Math.cos(t);
       this.lineTo(px, py);
       t += dt;
       px = x - ratio * r * Math.sin(t);
       py = y - ratio * r * Math.cos(t);
       this.lineTo(px, py);
       t += dt;
   }
   this.closePath();
}

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
            {ctx.moveTo(x, y-30)}
            {ctx.lineTo(x-20, y+10)}
            {ctx.lineTo(x+20, y+10)}
            {ctx.closePath()}
            {ctx.stroke()}
          </div>
        )
      case 'DIV':
        return (
          <div>
            {ctx.beginPath()}
            {ctx.strokeStyle=props.color}
            {ctx.star(x,y,20,0.5,4,360)}
            {ctx.stroke()}
          </div>
        )
        break;
    }
}


