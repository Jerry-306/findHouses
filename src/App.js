import React, { Component } from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'
import HouseDetail from './pages/HouseDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Rent from './pages/Rent'
import RentAdd from './pages/Rent/Add'
import RentSearch from './pages/Rent/Search'
import AuthRoute from './components/AuthRoute'

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
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          {/* 配置登录后才能访问的页面 */}
          <AuthRoute exact path="/rent" component={Rent} />
          <AuthRoute path="/rent/add" component={RentAdd} />
          <AuthRoute path="/rent/search" component={RentSearch} />
          
          {/* 重定向 */}
          <Redirect to="/home"/>
        </Switch>
      </div>
    )
  }
}