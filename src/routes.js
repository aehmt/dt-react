import React from 'react';
import {Route, IndexRoute } from 'react-router';
import App from './components/app.js'
import Lobby from './components/Lobby.js'
import Container from './components/Container.js'
import Splash from './components/Splash.js'

export default (
  <Route path="/" component={Container}>
    <IndexRoute component={Splash} /> 
    <Route path='/rooms' component={Lobby} />
    <Route path='rooms/:roomId' component={App} />
</Route>
)
