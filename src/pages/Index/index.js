import React, { Component } from 'react'
// 导入轮播图组件、Flex组件
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile'
import API from '../../utils/api'

// 导入环境变量URL
import {BASE_URL} from '../../utils/url'
import './index.css'
// 导入获取当前位置城市方法
import {getCurrentCity} from '../../utils'
import SearchHeader from '../..//components/SearchHeader'
// 导入导航栏图片
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'

// 导航菜单静态数据
const navs = [
    {
      id: 1,
      img: Nav1,
      title: '整租',
      path: '/home/list'
    },
    {
      id: 2,
      img: Nav2,
      title: '合租',
      path: '/home/list'
    },
    {
      id: 3,
      img: Nav3,
      title: '地图找房',
      path: '/map'
    },
    {
      id: 4,
      img: Nav4,
      title: '去出租',
      path: '/rent/add'
    }
]

export default class Index extends Component {
    state = {
        // 轮播图数组
        swipers: [],
        isSwiperLoaded: false,
        // 租房小组数据
        groups: [],
        // 资讯数据
        news: [],
        // 当前位置城市（默认是北京市）
        currentCity: '北京',
        cityId: ''
    }

    // 获取轮播图数组
    async getSwiper () {
        const res = await API.get('/home/swiper');
        this.setState({
            swipers: res.data.body,
            isSwiperLoaded: true
        });
    }

    // 获取租房小组数据
    async getGroups () {
        const {cityId} = this.state;
        const res = await API.get('/home/groups', {
            params: {
                area: cityId
            }
        });
        this.setState({
            groups: res.data.body
        })
    }
    
    // 获取资讯数据
    async getNews () {
        const {cityId} = this.state;
        const res = await API.get('/home/news', {
            params: {
                area: cityId
            }
        });
        this.setState({
            news: res.data.body
        })
    }
    // 获取当前定位城市
    async getCity() {
        const res = await getCurrentCity();
        this.setState({
            currentCity: res.label,
            cityId: res.value
        })
    }
     
    // 渲染轮播图
    renderSwiper () {
        return this.state.swipers.map(item => (
            <a
              key={item.id}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height:212 }}
            >
                <img
                    src={BASE_URL + item.imgSrc}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                />
            </a>
          ))
    }

    // 渲染导航菜单
    renderNav () {
        return navs.map((nav)=>
        <Flex.Item
            key={nav.id}
            onClick={()=> this.props.history.push(nav.path)}
        >
            <img src={nav.img} alt=""/>
            <h2>{nav.title}</h2>
        </Flex.Item> 
        )
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

    componentDidMount() {
        this.getSwiper();
        this.getGroups();
        this.getNews();
        this.getCity();
    }

    render() {
        return (
        <div>
            {/* 轮播图 */}
            <div className="swiper">
            {
                this.state.isSwiperLoaded ? 
                <Carousel autoplay infinite>
                    {this.renderSwiper()}
                </Carousel> : ''
            }
            {/* 搜索框 */}
            <SearchHeader currentCity={this.state.currentCity} />
            </div>
            {/* 导航栏 */}
            <Flex className="nav"> 
                {this.renderNav()}
            </Flex>
            {/* 租房小组 */}
            <div className="group">
                <div className="group-title">
                    租房小组<span className="more">更多</span>
                </div>
                <Grid
                    data={this.state.groups}
                    columnNum={2}
                    square={false}
                    hasLine={false}
                    renderItem={item => (
                    <Flex className="group-item" justify="around" key={item.id}>
                        <div className="desc">
                        <p className="title">{item.title}</p>
                        <span className="info">{item.desc}</span>
                        </div>
                        <img src={ BASE_URL +item.imgSrc } alt="" />
                    </Flex>
                    )}
                />
            </div>
            {/* 最新资讯 */}
            <div className="news">
                <h3 className="group-title">最新资讯</h3>
                <WingBlank size="md">{this.renderNews()}</WingBlank>
            </div>
        </div>
        );
    }
}
