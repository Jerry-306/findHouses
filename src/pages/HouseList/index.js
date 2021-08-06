import React, { Component } from 'react'
import {Flex} from 'antd-mobile'
// 导入搜素导航栏
import SearchHeader from '../../components/SearchHeader'
// 导入筛选栏组件
import Filter from './components/Filter'

// 导入样式
import styles from './index.module.css'

// 从本地存储中解构出当前城市名称
const {label} = JSON.parse(localStorage.getItem('zfy_city'))
export default class HouseList extends Component {
    
    render() {
        return (
            <div className={styles.root}>
                {/* 搜索导航栏 */}
                <Flex className={styles.header}>
                    <i className="iconfont icon-back" onClick={() => this.props.history.goBack()} />
                    <SearchHeader currentCity={label} className={styles.searchHeader}/>
                </Flex>

                {/* 分选栏 */}
                <Filter/>
            </div>
        )
    }
}
