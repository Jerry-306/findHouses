import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import 'react-virtualized/styles.css'
import './assets/fonts/iconfont.css'

import App from './App'
import './index.css'

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
  ,document.getElementById('root'));
