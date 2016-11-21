import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import routes from './routes'
import { Router, browserHistory } from 'react-router'


import './styles/app.scss';


ReactDOM.render(<Router history={browserHistory} routes={routes} />, document.getElementById('main'))
