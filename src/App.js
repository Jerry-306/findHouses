import React, { Component, lazy, Suspense } from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Home from './pages/Home'

const CityList = lazy(() => import('./pages/CityList'))
const Map = lazy(() => import('./pages/Map'))
const HouseDetail = lazy(() => import('./pages/HouseDetail')) 
const Login = lazy(() => import('./pages/Login')) 
const Register = lazy(() => import('./pages/Register'))
const Rent = lazy(() => import('./pages/Rent')) 
const RentAdd = lazy(() => import('./pages/Rent/Add'))
const RentSearch = lazy(() => import('./pages/Rent/Search'))
const MyFavorite = lazy(() => import('./pages/MyFavorite'))
const AuthRoute = lazy(() => import('./components/AuthRoute'))

export default class App extends Component {
  render() {
    return (
      <div className="App">
        {/* 注册路由 */}
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Switch>
            <Route path="/home"component={Home}/>
            <Route path="/citylist"component={CityList}/>
            <Route path="/map" component={Map}/>
            <Route path="/detail/:id" component={HouseDetail} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />

            {/* 配置登录后才能访问的页面 */}
            <AuthRoute exact  path="/rent" component={Rent} />
            <AuthRoute path="/rent/add" component={RentAdd} />
            <AuthRoute path="/rent/search" component={RentSearch} />
            <AuthRoute path="/favorite" component={MyFavorite} />
            
            {/* 重定向 */}
            <Redirect to="/home"/>
          </Switch>
        </Suspense>
      </div>
    )
  }
}