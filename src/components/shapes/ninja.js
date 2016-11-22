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

export default function Ninja(props){
  var c = document.getElementById("star");
  var ctx = c.getContext("2d");

  return (
    <div>
      {ctx.beginPath()}
      {ctx.strokeStyle=props.color}
      {ctx.lineWidth=1.5}
      {ctx.star(20,20,20,0.5,4,360)}
      {ctx.stroke()}
    </div>

  )
}
