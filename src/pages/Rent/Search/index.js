import React, { Component } from 'react'
import { SearchBar } from 'antd-mobile'

import API from '../../../utils/api'

import {getCity} from '../../../utils/city'

import styles from './index.module.css'

export default class RentSearch extends Component {
    cityId = getCity().value;

    timerId = null;
    
    state = {
        searchText: '',
        tipList: []
    }

    // 渲染搜素结果列表
    renderTips = () => {
        const { tipList } = this.state;
        return tipList.map( item => (
            <li key={item.community} className={styles.tip}>
                {item.communityName}
            </li>
        ))
    }

    handleSearchText = ( value ) => {
        this.setState({
            searchText: value
        })

        if ( !value ) {
            // 如果没有输入值
            return this.setState({
                tipList: []
            })
        }
        
        /* 避免重发送请求 */
        // 清除上一次定时器
        clearTimeout(this.timerId)

        this.timerId =  setTimeout( async ()=> {
            // 获取小区数据
            const res = await API.get('/area/community', {
                params: {
                    name: value,
                    id: this.cityId
                }
            })

            this.setState({
                tipList: res.data.body
            })
        }, 500);
    }

    render() {
        const { history } = this.props;
        const { searchText } = this.state;
        return (
            <div className={styles.root}> 
                <SearchBar
                    value={ searchText }
                    placeholder="请输入小区名称"
                    onSubmit={value => console.log(value, 'onSubmit')}
                    onClear={value => console.log(value, 'onClear')}
                    onFocus={() => console.log('onFocus')}
                    onBlur={() => console.log('onBlur')}
                    onCancel={() => console.log('onCancel')}
                    showCancelButton
                    onChange={this.handleSearchText}
                />
            </div>
        )
    }
}
