import React, { Component } from 'react'
import { Flex, WingBlank } from 'antd-mobile'
import API from '../../utils/api'
import {BASE_URL} from '../../utils/url'
import MyNavBar from '../../components/MyNavBar'

import './index.css'

export default class News extends Component {
    state = {
        news: []
    }

    // 获取资讯数据
    async getNews () {
        const res = await API.get('/home/news', {
            params: {
                area: 'AREA%7C88cff55c-aaa4-e2e0'
            }
        });
        this.setState({
            news: res.data.body
        })
    }

    // 渲染最新资讯
    renderNews() {
        return this.state.news.map(item => (
        <div className="news-item" key={item.id}>
            <div className="imgwrap">
            <img
                className="img"
                src={ BASE_URL + item.imgSrc}
                alt=""
            />
            </div>
            <Flex className="content" direction="column" justify="between">
            <h3 className="title">{item.title}</h3>
            <Flex className="info" justify="between">
                <span>{item.from}</span>
                <span>{item.date}</span>
            </Flex>
            </Flex>
        </div>
        ))
    }

    componentDidMount () {
        this.getNews();
    }
    
    render() {
        return (
            <div className="root">
                <MyNavBar onLeftClick={ () => this.props.history.goBack()}>最新资讯</MyNavBar>
                <div className="news">
                    <WingBlank size="md">{this.renderNews()}</WingBlank>
                </div>
            </div>
        )
    }
}
