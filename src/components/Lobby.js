import React from 'react'
import {Link} from 'react-router'
const BASE_URL = 'https://dry-fortress-11373.herokuapp.com/api/v1/artworks'


export default class Lobby extends React.Component {
  constructor(){
    super()
    this.state = {rooms: []}
    this.getRooms = this.getRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)
  }
  componentWillMount(){
    this.getRooms()
  }
  getRooms() {
    fetch(`${BASE_URL}`)
      .then(res => res.json())
      .then(json => this.setState({
          rooms: json.artworks.map(artwork => artwork.id)
        })
      )
  }
  createRoom(){
    fetch(`${BASE_URL}`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({'artwork': {'editable': true}})})
    this.getRooms()
  }
  
  render(){
    return (
      <div>
        Available rooms:
        <ul>
          {this.state.rooms.map(room => (<li key={room}><Link to={`/rooms/${room}`}>Room {room}</Link></li>))}
        </ul>
        <button onClick={this.createRoom}>Make a room</button>
      </div>
    )
  }
}
