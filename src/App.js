import React, { Component } from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'
import HouseDetail from './pages/HouseDetail'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        {/* 注册路由 */}
        <Switch>
          <Route path="/home"component={Home}/>
          <Route path="/citylist"component={CityList}/>
          <Route path="/map" component={Map}/>
          <Route path="/detail/:id" component={HouseDetail} />
          <Redirect to="/home"/>
        </Switch>
      </div>
    )
  }
}