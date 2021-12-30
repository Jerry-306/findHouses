import React, { Component } from 'react'

import {Flex} from 'antd-mobile'

import styles from './index.module.css'

const titleList = [
    {title: '区域', type: 'area'},
    {title: '方式', type: 'mode'},
    {title: '价格', type: 'price'},
    {title: '筛选', type: 'more'}
]

export default class FilterTitle extends Component {
    state = {
        titleList
    }
    render() {
        const {titleSelectedStatus, onClick} = this.props;
        return (
            <Flex align="center" className={styles.root}>
                {
                    this.state.titleList.map( item => {
                        const isSelected = titleSelectedStatus[item.type]
                        return (
                            <Flex.Item key={item.type} onClick={ () => onClick(item.type) } >
                                <span className={[styles.dropdown, isSelected ? styles.selected : ''].join(' ')}>
                                    <span>{item.title}</span>
                                    <i className="iconfont icon-arrow" />
                                </span>
                            </Flex.Item>
                        )
                    })
                }

            </Flex>
        )
    }
}
