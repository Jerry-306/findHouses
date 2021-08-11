import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {

    state = {
        // tag 的选中值
        selectedValues: this.props.defaultValues
    }

    onTagClick (value) {
        const { selectedValues } = this.state;
        let array = [...selectedValues];

        // 如果选中值中已经有当前值，说明用户此时再次点击该标签，那么就取消当前标签高亮效果
        if (selectedValues.includes(value)) {
            const index = array.indexOf(value);
            // 删除该标签
            array.splice(index, 1);
        } else {
            array.push(value);
        }

        this.setState({
            selectedValues: array
        })
    }

    // 清空选项
    onCancel = () => {
        this.setState({
            selectedValues: []
        })
    }

    // 确认按钮事件
    onOk = () => {
        const {type, onSave} = this.props;
        onSave(type, this.state.selectedValues);
    }

    // 渲染标签
    renderFilters (data) {
        // 高亮类名： styles.tagActive
        return data.map( item => {
            const { selectedValues } = this.state;
            // 判断选中数组中是否有当前标签值
            const isSelected = selectedValues.includes(item.value);
            return (
                <div 
                    key={item.value} 
                    className={[styles.tag, isSelected ? styles.tagActive : '' ].join(' ')}
                    onClick={ () => this.onTagClick(item.value) }
                >
                    {item.label}
                </div>
            )
        })
    }

    render() {
        const {
            data: {
                characteristic, floor, oriented, roomType
            }
        } = this.props
        return (
            <div className={styles.root}>
                {/* 条件内容 */}
                <div className={styles.tags}>
                    <div className={styles.name}>户型</div>
                    <div className={styles.child}>{this.renderFilters(roomType)}</div>

                    <div className={styles.name}>楼层</div>
                    <div className={styles.child}>{this.renderFilters(floor)}</div>

                    <div className={styles.name}>朝向</div>
                    <div className={styles.child}>{this.renderFilters(oriented)}</div>

                    <div className={styles.name}>特色</div>
                    <div className={styles.child}>{this.renderFilters(characteristic)}</div>
                </div>

                    <FilterFooter className={styles.footer} cancelText='清除' onCancel={this.onCancel} onOk={this.onOk} />
            </div>
        )
    }
}
