import React from 'react'

export default class SaveButton extends React.Component {
  sendData() { 
    let canvas = document.getElementById('ourCanvas');
    let imgdata = canvas.toDataURL()
    let data = {'artwork': {'editable': true, 'state': imgdata}}
    fetch('https://dry-fortress-11373.herokuapp.com/api/v1/artworks', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})
      .then((res) => res.json())
      .then((json) => console.log(res))  
  } 
  render(){
    return (
      <div>
        <button onClick={this.sendData}>Save this art</button>
      </div>
    )
    }
  }


//artwork: editable, state
