import React from 'react'

export default class SaveButton extends React.Component {
  constructor(props) {
    super(props)
    this.sendData = this.sendData.bind(this)
  }
  sendData() { 
    let canvas = document.getElementById('ourCanvas');
    let imgdata = canvas.toDataURL()
    let data = {'artwork': {'editable': true, 'state': imgdata}}
    fetch(`https://dry-fortress-11373.herokuapp.com/api/v1/artworks/${this.props.roomId}`, {method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})
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
