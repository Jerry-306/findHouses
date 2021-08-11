import React, { Component, lazy } from 'react'
import {TabBar} from 'antd-mobile'
import {Redirect, Route, Switch} from 'react-router-dom'
import './index.css'
import Index from '../Index'
const News = lazy(() => import('../News'))
const HouseList  = lazy(() => import('../HouseList'))
const Profile = lazy(() => import('../Profile'))

// tabbar 数据
const tabItems = [
    {
        title: '首页',
        id: 1,
        icon: 'icon-ind',
        path: '/home'
    },
    {
        title: '搜索',
        id: 2,
        icon: 'icon-findHouse',
        path: '/home/list'
    },
    {
        title: '资讯',
        id: 3,
        icon: 'icon-infom',
        path: '/home/news'
    },
    {
        title: '我的',
        id: 4,
        icon: 'icon-my',
        path: '/home/profile'
    }
]

export default class Home extends Component {
    state = {
        selectedTab: this.props.location.pathname
    }

    componentDidUpdate (prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.setState ({
                selectedTab: this.props.location.pathname,
            })
        }
    }
    // 渲染tabbar item
    renderTabbarItem = () => {
        return tabItems.map( (item) =>
            <TabBar.Item
                title={item.title}
                key={item.id}
                icon={
                    <i className={`iconfont ${item.icon}`}/>
                }
                selectedIcon={
                    <i className={`iconfont ${item.icon}`}/>
                }
                selected={this.state.selectedTab === item.path}
                onPress={() => {
                this.setState({
                    selectedTab: item.path,
                });
                this.props.history.push(item.path)
                }}
            >
            </TabBar.Item>
        )
    }
    render() {
        return (
            <div className="home">
                <Switch>
                    <Route exact path='/home' component={Index} />
                    <Route path='/home/list' component={HouseList} />
                    <Route path='/home/news' component={News} />
                    <Route path='/home/profile' component={Profile} />
                    <Redirect to='/home'/>
                </Switch>
                <TabBar tintColor="#02cf7a" barTintColor="white" noRenderContent={true}>
                    {this.renderTabbarItem()}
                </TabBar>
            </div>
        )
    }
}
