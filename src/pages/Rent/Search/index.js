import React, { Component } from 'react'
import { SearchBar } from 'antd-mobile'

import API from '../../../utils/api'

import NoHouse from '../../../components/NoHouse'

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

        if (tipList.length === 0) {
            return (
                <NoHouse>
                    这里空空如也，换个词试试吧~
                </NoHouse>
            )            
        }
        return tipList.map( item => (
            <div key={item.community} className={styles.tip} onClick={ () => this.onTipClick(item)}>
                {item.communityName}
            </div>
        ))
    }

    onTipClick = (item) => {
        this.props.history.replace('/rent/add', {
            name: item.communityName,
            id: item.community
        })
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
        clearTimeout(this.timerId);

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
                    onCancel={() => history.goBack()}
                    showCancelButton
                    onChange={this.handleSearchText}
                />

                <div className={styles.tips}>{this.renderTips()}</div>
            </div>
        )
    }
}
