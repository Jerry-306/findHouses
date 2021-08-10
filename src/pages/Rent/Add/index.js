import React, { Component } from 'react'
import { List,  InputItem, Picker } from 'antd-mobile'

import MyNavBar from '../../../components/MyNavBar'
import styles from './index.module.css'

const Item = List.Item;
export default class RentAdd extends Component {
    constructor (props) {
        super(props)

        const { state } = props.location;
        let community = {
            name: '',
            id: ''
        }

        if (state) {
            community.name = state.name;
            community.id = state.id;
        }

        this.state = {
            // 临时图片地址
            tempSlides: [],
            // 小区名称和id
            community,
            title: '',
            tags: [],
            price: 0,
            // 房型
            roomType: '',
            // 房屋面积
            size: 0,
            // 朝向
            oriented: [],
            floor: '',
            supporting: '',
            description: ''
        }

    }

    onCancel = () => {

    } 

    render() {
        const { 
            tempSlides,
            community,
            title,
            price,
            roomType,
            size,
            oriented,
            floor,
            description
        } = this.state;
        return (
            <div className={styles.root}>
                <MyNavBar onLeftClick={this.onCancel}>发布房源</MyNavBar>

            <List renderHeader={() => '房屋信息'} className={styles.title}>
                <Item  
                    arrow="horizontal"  
                    extra={community.name || '请输入小区名称'} 
                    onClick={() => this.props.history.replace('/rent/search') } 
                >小区名称</Item>

                <InputItem placeholder="请输入每月租金" type="number" extra="￥/月" value={} >
                    每月租金
                </InputItem>

                <InputItem placeholder="请输入建筑面积" type="number" extra="㎡" value={}>
                    建筑面积
                </InputItem>

                <Picker data={} calue={} cols={} >
                    <Item arrow="horizontal">户   型</Item>
                </Picker>
                <Picker data={} calue={} cols={} >
                    <Item arrow="horizontal">所在楼层</Item>
                </Picker>
                <Picker data={} calue={} cols={} >
                    <Item arrow="horizontal">朝   向</Item>
                </Picker>
            </List>

            <List renderHeader={() => '房屋标题'} className={styles.title}>
                <InputItem placeholder="请输入房屋标题（例如：合租 小区名 3室 2000元" value={} ></InputItem>
            </List>
            </div>
        )
    }
}
