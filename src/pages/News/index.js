import React, { Component } from 'react'
import { Flex, WingBlank } from 'antd-mobile'
import API from '../../utils/api'
import {BASE_URL} from '../../utils/url'
import MyNavBar from '../../components/MyNavBar'
import { getCity } from '../../utils/city'
import './index.css'

export default class News extends Component {
    state = {
        news: [],
        cityId: ''
    }

    // 获取资讯数据
    async getNews () {
        const { cityId } = this.state;
        const res = await API.get('/home/news', {
            params: {
                area: cityId
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

    async componentDidMount () {
        const {value} = await getCity();
        this.setState({
            cityId: value
        });
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
