import React from 'react'
import {Link} from 'react-router'
const BASE_URL = 'https://dry-fortress-11373.herokuapp.com/api/v1/'


export default class Lobby extends React.Component {
  constructor(){
    super()
    this.state = {rooms: []}
  }
  componentWillMount(){
    fetch(`${BASE_URL}artworks`)
      .then(res => res.json())
      .then(json => this.setState({
          rooms: json.artworks.map(artwork => artwork.id)
        })
      )
    }

  render(){
    return (
      <div>
        Available rooms: {this.state.rooms.map(room => (<Link key={room} to={`/rooms/${room}`}>Room {room}</Link>))}
      </div>
    )
  }
}
