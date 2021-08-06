import React from 'react'
import ReactDOM from 'react-dom'
import 'antd-mobile/dist/antd-mobile.css'
import {BrowserRouter} from 'react-router-dom'
import 'react-virtualized/styles.css'
import './assets/fonts/iconfont.css'
import './index.css'
import App from './App'

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
  ,document.getElementById('root'));
