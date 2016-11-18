import React from 'react';
import {Route, IndexRoute } from 'react-router';
import App from './components/app.js'
import Lobby from './components/Lobby.js'


export default (
  <Route path="/">
    <Route path='lobby' component={Lobby} />
    <Route path='rooms/:roomId' component={App} />
</Route>
)
