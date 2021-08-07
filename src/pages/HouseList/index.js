import React, { Component } from 'react'
import {Flex, Toast} from 'antd-mobile'
import {List, AutoSizer, WindowScroller, InfiniteLoader} from 'react-virtualized'
// 导入搜素导航栏
import SearchHeader from '../../components/SearchHeader'
// 导入筛选栏组件
import Filter from './components/Filter'
// 导入房屋列表组件
import HouseItem from '../../components/HouseItem'
// 导入吸顶组件
import Sticky from '../../components/Sticky'
// 导入没有房源提示组件
import NoHouse from '../../components/NoHouse'
import {getCurrentCity} from '.././../utils/index'

import API from '../../utils/api'

import { BASE_URL} from '../../utils/url'

// 导入样式
import styles from './index.module.css'

export default class HouseList extends Component {
    labei = '';
    value = '';
    state = {
        list: [],   // 房源数据
        count: 0,   // 房源数量
        isLoading: false   // 房源数据是否正在加载
    }

    filters = {};

    // 接收Filter 组件中房屋筛选条件数据
    onFilter = (filters) => {
        this.filters = filters;
        this.searchHouseList();
        // 点击确定按钮时， 页面回到顶部
        window.scrollTo(0, 0);
    }
    
    // 获取房屋列表数据
    async searchHouseList () {
        this.setState({
            isLoading: true
        })

        Toast.loading('加载中……', 0, null, false);

        const res = await API.get('/houses', {
            params: {
                cityId: this.value,
                ...this.filters,
                start: 1,
                end:30
            }
        });

        const {list, count} = res.data.body;
        this.setState({
            list,
            count,
            isLoading: false
        });
         
        Toast.hide();
        if (count !== 0) {
            Toast.info(`共找到 ${count} 套房源`, 2, null, false);
        } 
    } 

    // List组件渲染每一行的方法：
    renderHouseList = ({
        key, 
        index, 
        style //给每一个行数据添加该样式！作用：指定每一行的位置
    }) => {
        // 根据index获取每一行的数据
        const { list } = this.state;
        const house = list[index];
         
        if ( !house ) {
            return (
                <div key={key} style={style} className={styles.loading} >
                    <p >加载中……</p>
                </div>
            )
        }

        return (
            <HouseItem 
                key={key}
                style={style}
                src={BASE_URL + house.houseImg}
                title={house.title}
                desc={house.desc}
                tags={house.tags}
                price={house.price}
            />
        )
    }

    // 渲染列表项
    renderHouseItem () {
        const {count, isLoading} = this.state;
        if (count === 0 && !isLoading) {
            return <NoHouse>没有找到合适房源，换个条件试试吧 ~ ~</NoHouse>
        }

        return (
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                loadMoreRows={this.loadMoreRows}
                rowCount={ count }
            >
                { ({ onRowsRendered, registerChild }) => (
                <WindowScroller>
                    { ({height, isScrolling, scrollTop}) => (
                        <AutoSizer>
                            { ( {width} ) => (
                                <List
                                onRowsRendered={onRowsRendered}
                                ref={registerChild}
                                autoHeight
                                width={width}  // 视口宽度
                                height={height}  // 视口高度
                                rowCount={ count } // 行数
                                rowHeight={120}  // 行高
                                rowRenderer={this.renderHouseList}  // 渲染每一行
                                isScrolling={isScrolling}
                                scrollTop={scrollTop}
                                />
                            )}
                        </AutoSizer>
                    ) }
                </WindowScroller>
                )}
            </InfiniteLoader>
        )
    }

    // 判断列表中每一行数据是否加载完成
    isRowLoaded = ({ index }) => {
        return !!this.state.list[index]
    }

    // 获取更多房屋列表数据  该方法返回 Peomise 对象, 并且数据加载完时要被解决
    loadMoreRows = ({ startIndex, stopIndex }) => {
        return new Promise ( resolve => {
            API.get('/houses', {
                params: {
                    cityId: this.value,
                    ...this.filters,
                    start: startIndex,
                    end: stopIndex
                }
            }).then( res => {
                this.setState({
                    list: [...this.state.list, ...res.data.body.list]
                })
            })
        })
    }

    async componentDidMount () {
        const {label, value} = await getCurrentCity();
        this.label = label;
        this.value = value;
        this.searchHouseList();
    }

    render() {
        const { count } = this.state;
        return (
            <div className={styles.root}>
                {/* 搜索导航栏 */}
                <Flex className={styles.header}>
                    <i className="iconfont icon-back" onClick={() => this.props.history.goBack()} />
                    <SearchHeader currentCity={this.label} className={styles.searchHeader}/>
                </Flex>

                {/* 分选栏 */}
                <Sticky height={40}>
                    <Filter onFilter={this.onFilter} />
                </Sticky>

                {/* 房屋列表 */}
                <div className={styles.houseItems}>
                    {this.renderHouseItem()}
                </div>
            </div>
        )
    }
}
