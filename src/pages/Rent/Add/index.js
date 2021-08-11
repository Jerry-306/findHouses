import React, { Component } from 'react'
import { List,  InputItem, Picker, ImagePicker, TextareaItem, Modal } from 'antd-mobile'

import HousePackage from '../../../components/HousePackage'
import MyNavBar from '../../../components/MyNavBar'
import FilterFooter from '../../../components/FilterFooter'
import styles from './index.module.css'

const Item = List.Item;

const  floorData=[
    {label: "高楼层", value: "FLOOR|1"},
    {label: "中楼层", value: "FLOOR|2"},
    {label: "低楼层", value: "FLOOR|3"}
]; 
const orientedData=[
    {label: "一室", value: "ROOM|d4a692e4-a177-37fd"},
    {label: "二室", value: "ROOM|d1a00384-5801-d5cd"},
    {label: "三室", value: "ROOM|20903ae0-c7bc-f2e2"},
    {label: "四室", value: "ROOM|ce2a5daa-811d-2f49"},
    {label: "四室+", value: "ROOM|2731c38c-5b19-ff7f"}
]; 
const roomTypeData=[
    {label: "东", value: "ORIEN|141b98bf-1ad0-11e3"},
    {label: "西", value: "ORIEN|103fb3aa-e8b4-de0e"},
    {label: "南", value: "ORIEN|61e99445-e95e-7f37"},
    {label: "北", value: "ORIEN|caa6f80b-b764-c2df"},
    {label: "东南", value: "ORIEN|dfb1b36b-e0d1-0977"},
    {label: "东北", value: "ORIEN|67ac2205-7e0f-c057"},
    {label: "西南", value: "ORIEN|2354e89e-3918-9cef"},
    {label: "西北", value: "ORIEN|80795f1a-e32f-feb9"}
];
// const characteristicData=[
//     {label: "集中供暖", value: "CHAR|f56b9ad7-a97c-b28f"},
//     {label: "双卫生间", value: "CHAR|51ae05f0-7c7a-c24b"},
//     {label: "近地铁", value: "CHAR|76eb0532-8099-d1f4"},
//     {label: "随时看房", value: "CHAR|ee11187b-a631-beef"},
//     {label: "精装", value: "CHAR|1d9bf0be-284f-93dd"},
//     {label: "公寓", value: "CHAR|2d9fb1b2-dbf9-eb64"},
//     {label: "独立卫生间", value: "CHAR|c3d3e453-c3fa-d,4af"},
//     {label: "押一付一", value: "CHAR|f838b575-9196-bf13,"},
//     {label: "独立阳台", value: "CHAR|479e8f8a-f193-9605"},
//     {label: "月租", value: "CHAR|3870eb95-3f80-e5f8"},
//     {label: "限女生", value: "CHAR|014e0e46-2147-8785"},
//     {label: "限男生", value: "CHAR|7121e024-499d-c929"},
//     {label: "新上", value: "CHAR|41e8322b-3846-d721"}
// ];
const alert = Modal.alert;
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
        alert('提示', '确定退出吗？', [
            { text: '取消'},
            { text: '确定', onPress: () => this.props.history.goBack() }
        ])
    } 

    onOk = () => {

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

            <List renderHeader={() => '房屋信息'}>
                <Item  
                    arrow="horizontal"  
                    extra={community.name || '请输入小区名称'} 
                    onClick={() => this.props.history.replace('/rent/search') } 
                >小区名称</Item>

                <InputItem placeholder="请输入每月租金" extra="￥/月" value={price} >
                    每月租金
                </InputItem>

                <InputItem placeholder="请输入建筑面积" extra="㎡" value={size}>
                    建筑面积
                </InputItem>

                <Picker data={roomTypeData} value={[roomType]} cols={1} >
                    <Item arrow="horizontal">户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型</Item>
                </Picker>
                <Picker data={floorData} calue={floor} cols={1} >
                    <Item arrow="horizontal">所在楼层</Item>
                </Picker>
                <Picker data={orientedData} calue={oriented} cols={1} >
                    <Item arrow="horizontal">朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向</Item>
                </Picker>
            </List>

            <List renderHeader={() => '房屋标题'}>
                <InputItem placeholder="请输入房屋标题（例如：合租 小区名 3室 2000元）" value={title} ></InputItem>
            </List>

            <List renderHeader={() => '房屋图像'}>
                <ImagePicker 
                    files={tempSlides}
                    multiple={true}
                    className={styles.imagePicker}
                />
            </List>

            {/* <List renderHeader={() => '房屋配置'} className={styles.supporting}>
                <HousePackage select />
            </List> */}

            <List renderHeader={() => '房屋描述'}>
                <TextareaItem
                    rows={5}
                    placeholder="请输入房屋描述信息"
                    value={description} 
                />
            </List>

            <FilterFooter 
                className={styles.buttons}
                cancelText="取消"
                okText="提交"
                onCancel={this.onCancel}
                onOk={this.onOk}
            />
            </div>
        )
    }
}
