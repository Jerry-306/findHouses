import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {

    // 渲染标签
    renderFilters () {
        // 高亮类名： styles.tagActive
        return (
            <span className={[styles.tag, styles.tagActive].join('')}> xxx </span>
        )
    }

    render() {
        return (
            <div className={styles.root}>
                {/* 遮罩层 */}
                <div className={styles.mask} />

                {/* 条件内容 */}
                <div className={styles.tag}>
                    <dl className={styles.dl}>
                        <dt className={styles.dt}>户型</dt>
                        <dd className={styles.dd}>{this.renderFilters()}</dd>

                        <dt className={styles.dt}>户型</dt>
                        <dd className={styles.dd}>{this.renderFilters()}</dd>

                        <dt className={styles.dt}>户型</dt>
                        <dd className={styles.dd}>{this.renderFilters()}</dd>

                        <dt className={styles.dt}>户型</dt>
                        <dd className={styles.dd}>{this.renderFilters()}</dd>

                    </dl>
                </div>
                
                {/* 底部按钮 */}
                <FilterFooter className={styles.footer} />
            </div>
        )
    }
}
