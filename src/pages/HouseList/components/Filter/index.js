import React, { Component } from 'react'

import FilterMore from '../FilterMore'
import FilterPicker from '../FilterPicker'
import FilterTitle from '../FilterTitle'

import API from '../../../../utils/api'

import styles from './index.module.css'

// 标题栏数组
const titleSelectedStatus = {
    area: false,
    mode: false,
    price: false,
    more: false
}

// FilterOicker 默认选中值
const selectedValues = {
    area: ['area', 'null'],
    mode: ['null'],
    price: ['null'],
    more: []
}

export default class Filter extends Component {

    state = {
        titleSelectedStatus,
        // 控制 FilterPicker  FilterMore 组件的展示或隐藏
        openType: '',
        // 筛选数据
        filtersData: {},
        // 选中值
        selectedValues

    }

    componentDidMount () {
        this.getFiltersData();
    }

    async getFiltersData () {
        // 获取当前定位城市id
        const {value} = JSON.parse(localStorage.getItem('zfy_city'));
        const res = await API.get(`/houses/condition?id=${value}`);
        this.setState({
            filtersData: res.data.body
        })

    }

    // 取消（隐藏）对话框
    onCancel = (type) => {
        const {selectedValues, titleSelectedStatus} = this.state;
        let newTitleSelectedStatus = {...titleSelectedStatus};

        const selectedVal = selectedValues[type];
        if ( type === 'area' && (selectedVal.length !==2 || selectedVal[0] !== 'area') ) {
            newTitleSelectedStatus[type] = true;
        } else if ( type === 'mode' && selectedVal[0] !== 'null') {
            newTitleSelectedStatus[type] = true;
        } else if (type === 'price' && selectedVal[0] !== 'null') {
            newTitleSelectedStatus[type] = true;
        } else if ( type === 'more' && selectedVal.length !== 0 ) {
            newTitleSelectedStatus[type] = true;
        } else {
            newTitleSelectedStatus[type] = false;
        }

        this.setState({
            openType: '',
            titleSelectedStatus: newTitleSelectedStatus
        })
    }
    
    // 确定
    onSave = (type, value) => {
        // 判断标题选中状态
        const { titleSelectedStatus } = this.state;
        let newTitleSelectedStatus = {...titleSelectedStatus};

        const selectedVal = value;

        if ( type === 'area' && (selectedVal.length !==2 || selectedVal[0] !== 'area') ) {
            newTitleSelectedStatus[type] = true;
        } else if ( type === 'mode' && selectedVal[0] !== 'null') {
            newTitleSelectedStatus[type] = true;
        } else if (type === 'price' && selectedVal[0] !== 'null') {
            newTitleSelectedStatus[type] = true;
        } else if ( type === 'more' && selectedVal.length !== 0 ) {
            newTitleSelectedStatus[type] = true;
        } else {
            newTitleSelectedStatus[type] = false;
        }

        this.setState({
            openType: '',
            titleSelectedStatus: newTitleSelectedStatus,
            selectedValues: {
                // ES6 语法 this.state.selectedValues[type] 的属性值会覆盖之前 [type] 对应的属性值
                ...this.state.selectedValues,
                [type]: value
            }
        })
    }
    // 改变标题颜色
    onTitleClick = (type) => {
        const {selectedValues, titleSelectedStatus} = this.state;
        let newTitleSelectedStatus = {...titleSelectedStatus};

        // console.log(selectedValues);
        // 根据 selectedValues 里状态判断 哪些标题被选中
        Object.keys(titleSelectedStatus).forEach( key => {
            if ( key === type ) {
                // 当前选中状态
                newTitleSelectedStatus[key] = true;
                return;
            }

            // 其他标题
            const selectedVal = selectedValues[key];
            if ( key === 'area' && (selectedVal.length !==2 || selectedVal[0] !== 'area') ) {
                newTitleSelectedStatus[key] = true;
            } else if ( key === 'mode' && selectedVal[0] !== 'null') {
                newTitleSelectedStatus[key] = true;
            } else if (key === 'price' && selectedVal[0] !== 'null') {
                newTitleSelectedStatus[key] = true;
            } else if ( key === 'more' && selectedVal.length !== 0 ) {
                newTitleSelectedStatus[key] = true;
            } else {
                newTitleSelectedStatus[key] = false;
            }
        })
        this.setState({
            openType: type,
            titleSelectedStatus: newTitleSelectedStatus
        })
    }

    // 渲染 FilterPicker 组件方法
    renderFilterPicker () {
        const {openType, 
              filtersData: {area, subway, rentType, price}, 
              selectedValues } = this.state;

        if (openType !== 'area' && openType !== 'mode' && openType !== 'price') {
            return null
        } else {
            let data = [];
            let cols = 1;
            let ddefaultValue = selectedValues[openType];
            switch (openType) {
                case 'area':
                    data = [area, subway];
                    cols = 3;
                    break;
                case 'mode':
                    data = rentType;
                    break;
                case 'price':
                    data = price;
                    break;
                default:
                    break;
            }
            return <FilterPicker
                        key={openType}
                        data={data} 
                        cols={cols} 
                        type={openType}
                        ddefaultValue={ddefaultValue} 
                        onCancel={this.onCancel} 
                        onSave={this.onSave} 
                    />
        }
    }

    // 渲染 FilterMore 组件方法
    renderFilterMore () {
        //  characteristic, floor, oriented, roomType
        const { openType, 
                selectedValues,
                filtersData: {
                    characteristic, 
                    floor, 
                    oriented, 
                    roomType
                }} = this.state;

        const data = {characteristic, floor, oriented, roomType};
        const defaultValues = selectedValues.more;
        if ( openType === 'more' ) {
            return <FilterMore 
                        data={data} 
                        defaultValues={defaultValues}
                        type={openType} 
                        onSave={this.onSave}
                        onCancel={this.onCancel}
                    />
        } else {
            return null
        }
    }

    render() {
        const {titleSelectedStatus, openType} = this.state;
        return (
            <div className={styles.root}>
                {/* 遮罩层组件 */}
                {
                    openType === 'area' || openType === 'mode' || openType === 'price'
                    ? <div className={styles.mask} onClick={ () => this.onCancel(openType)} />
                    : null
                }

                {/* 内容组件 */}
                <div className={styles.content}>
                    {/* 标题栏 */}
                    <FilterTitle 
                        titleSelectedStatus={titleSelectedStatus}
                        onClick={this.onTitleClick} 
                    />

                    {/* 前三个菜单对应内容 */}
                    {this.renderFilterPicker()}

                    {/* 最后一个菜单对应内容 */}
                    {this.renderFilterMore()}
                </div>
            </div>
        )
    }
}
