import React, { Component } from 'react';
import axios from 'axios';
import {AutoSizer, List} from 'react-virtualized'
import MyNavBar from '../../components/MyNavBar'
import {getCurrentCity} from '../../utils'
import './index.css';

// 城市数据格式化
function formatCityData (list) {
    let cityList = {};
    let  cityIndex = [];
    // 将城市列表list按照首字母进行分类
    list.forEach(item => {
        let firstStr = item.short.substr(0,1);
        if (cityList[firstStr]) {
            cityList[firstStr].push(item)
        } else {
            cityList[firstStr] = [item]
        }
    });
    // 获取城市列表首字母数组
    cityIndex = Object.keys(cityList).sort();

    return {
        cityList,
        cityIndex
    }
}

// 封装处理字母索引的方法
function formatCityIndex (letter) {
    switch (letter) {
        case '#':
            return '当前定位'
        case 'hot':
            return '热门城市'
        default:
            return letter.toUpperCase()
    }
}
// 索引（A、B等）的高度
const TITLE_HEIGHT = 36;
// 每个城市名称的高度
const NAME_HEIGHT = 50;
// 目前有房源的城市
// const HOUSE_CITIES = ['北京', '南京', '上海', '广州', '深圳'];

export default class CityList extends Component {
    state = {
        cityList: {},
        cityIndex: [],
        activeIndex: 0
    }
    // 获取城市列表数据
    async getCityList () {
        const res = await axios.get('http://localhost:8009/area/city?level=1');
        const {cityList, cityIndex}  = formatCityData(res.data.body);

        // 获取热门城市,并添加至数据中
        const hotCities = await axios.get('http://localhost:8009/area/hot');
        cityList['hot'] = hotCities.data.body;
        cityIndex.unshift('hot');     
        
        // 获取当前定位城市
        const currentCity = await getCurrentCity();
        cityList['#'] = [currentCity];
        cityIndex.unshift('#');

        this.setState({
            cityList,
            cityIndex
        })
        // 数据结构：
        // cityList: {"#": [{}, {}...], "hot": [{},...], "a": [{}, {},...], ...}
        // cityIndex: ["#", "hot", "a","b", "c",..., "z"]
    }

    // List组件渲染每一行的方法：
    rowRenderer = ({
        key, // Unique key within array of rows
        index, // 索引号
        isScrolling, // 当前项是否正在滚动中
        isVisible, // 当前项在 List 中是可见的
        style // 注意：重点属性，一定要给每一个行数据添加该样式！作用：指定每一行的位置
    }) => {
        // 获取每一行的字母索引
        const { cityIndex, cityList } = this.state;
        // 字母索引
        const letter = cityIndex[index];

        return (
            <div key={key} style={style} className="city">
                <div className="title">{formatCityIndex(letter)}</div>
                {
                    // 渲染指定字母索引下的城市列表数据
                    cityList[letter].map( item => (
                        <div className="name" key={item.value} onClick={() => this.changeCity(item)}>
                            {item.label}
                        </div>
                    ))
                }
            </div>
        )
    }

    // 用于获取List 组件中渲染行的信息
    rowsRendered = ({startIndex}) => {
        // startIndex 当前城市列表顶部的索引号
        if (startIndex !== this.state.activeIndex) {
            this.setState({
                activeIndex: startIndex
            })
        }
    }

    // 创建动态计算每一行高度的方法
    getRowHeight = ({ index }) => {
        // 索引标题高度 + 城市数量 * 城市名称的高度
        // TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
        const { cityList, cityIndex } = this.state
        return TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
    }

    // 封装渲染右侧索引列表的方法
    renderCityIndex() {
        // 获取到 cityIndex，并遍历其，实现渲染
        const { cityIndex, activeIndex } = this.state
        return cityIndex.map((item, index) => (
            <li
                className="city-index-item"
                key={item}
                onClick={() => {
                    this.cityListComponent.scrollToRow(index)
                }}
            >
                <span className={activeIndex === index ? 'index-active' : ''}>
                {item === 'hot' ? '热' : item.toUpperCase()}
                </span>
            </li>
        ))
    }

    // 点击切换城市
    changeCity (city) {
        const {label, value} = city;
        // if (HOUSE_CITIES.includes(label)) {
        //     // 将城市数据存储到本地
        //     localStorage.setItem('zfy_city', JSON.stringify({label, value}));
        //     this.props.history.goBack();
        // } else {
        //     Toast.info('该城市暂无房源', 1, null, false)
        // }
        localStorage.setItem('zfy_city', JSON.stringify({label, value}));
        this.props.history.goBack();
    }

    async componentDidMount () {
        await this.getCityList();
        /* 调用 measureAllRows，提前计算 List 中每一行的高度，实现 scrollToRow 的精确跳转
        注意：调用这个方法的时候，需要保证 List 组件中已经有数据了！如果 List 组件中的数据为空，就会导致调用方法报错！
        解决：只要保证这个方法是在 获取到数据之后 调用的即可。*/
        this.cityListComponent.measureAllRows();
    }
    render() {
        return (
            <div className="citylist">
                <MyNavBar>
                    城市选择
                </MyNavBar>
                {/* 城市列表 */}
                <AutoSizer>
                {({ width, height }) => (
                    <List
                    ref={(c) => this.cityListComponent = c}
                    width={width}
                    height={height}
                    rowCount={this.state.cityIndex.length}
                    rowHeight={this.getRowHeight}
                    rowRenderer={this.rowRenderer}
                    onRowsRendered={this.rowsRendered}
                    scrollToAlignment="start"
                    />
                )}
                </AutoSizer>
                {/* 右侧索引列表 */}
                <ul className="city-index">{this.renderCityIndex()}</ul>
            </div>
        )
    }
}
