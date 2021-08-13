import React, { Component } from 'react'
import { List,  InputItem, Picker, ImagePicker, TextareaItem, Modal, Toast } from 'antd-mobile'

import HousePackage from '../../../components/HousePackage'
import MyNavBar from '../../../components/MyNavBar'
import FilterFooter from '../../../components/FilterFooter'

import API from '../../../utils/api'
import styles from './index.module.css'

const Item = List.Item;

const  floorData = [
    {label: "高楼层", value: "FLOOR|1"},
    {label: "中楼层", value: "FLOOR|2"},
    {label: "低楼层", value: "FLOOR|3"}
]; 
const roomTypeData = [
    {label: "一室", value: "ROOM|d4a692e4-a177-37fd"},
    {label: "二室", value: "ROOM|d1a00384-5801-d5cd"},
    {label: "三室", value: "ROOM|20903ae0-c7bc-f2e2"},
    {label: "四室", value: "ROOM|ce2a5daa-811d-2f49"},
    {label: "四室+", value: "ROOM|2731c38c-5b19-ff7f"}
]; 
const orientedData = [
    {label: "东", value: "ORIEN|141b98bf-1ad0-11e3"},
    {label: "西", value: "ORIEN|103fb3aa-e8b4-de0e"},
    {label: "南", value: "ORIEN|61e99445-e95e-7f37"},
    {label: "北", value: "ORIEN|caa6f80b-b764-c2df"},
    {label: "东南", value: "ORIEN|dfb1b36b-e0d1-0977"},
    {label: "东北", value: "ORIEN|67ac2205-7e0f-c057"},
    {label: "西南", value: "ORIEN|2354e89e-3918-9cef"},
    {label: "西北", value: "ORIEN|80795f1a-e32f-feb9"}
];

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
            price: '',
            // 房型
            roomType: '',
            // 房屋面积
            size: '',
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

    onSubmit = () => {
        alert('提示', '确定发布吗？', [
            { text: '取消'},
            { text: '确定', onPress: async () => {

                Toast.loading('请稍等', 0, null, false)
                const { tempSlides, community, supporting, title, price, roomType, size,  oriented, floor, description } = this.state;

                // 处理图片数据
                let houseImg = '';
                if (tempSlides.length > 0) {
                    const form = new FormData();
                    tempSlides.forEach( item => form.append('file', item.file));

                    const res = await API.post('/houses/image', form, {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    });
                    houseImg = res.data.body.join('|');
                }
                Toast.hide();
                // 调用接口，发布房源
                const res = await API.post('/user/houses', {
                    title,
                    description,
                    oriented,
                    supporting,
                    houseImg, 
                    community: community.id, 
                    price,
                    roomType, 
                    size, 
                    floor
                });
                
                if (res.data.status === 200) {
                    Toast.info('发布成功！', 2, null, false);
                    this.props.history.push('/rent')
                } else {
                    Toast.info('服务器开小差了，请稍后再试', 2, null, false)
                }
            }}
        ])
    }

    // 获取表单数据
    getValue = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    // 获取图片数据
    handleHouseImg = (files) => {
        this.setState({
            tempSlides: files
        })
    }

    // 获取房屋配置数据
    handleSupporting = (selectedVlalues) => {
        // console.log(selectedValues)
        this.setState({
            supporting: selectedVlalues.join('|')
        })
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
                    onClick={() => this.props.history.push('/rent/search') } 
                >小区名称</Item>

                <InputItem 
                    placeholder="请输入每月租金" 
                    extra="￥/月" 
                    type="number"
                    value={price} 
                    onChange={(val) => this.getValue('price', val)}
                >
                    每月租金
                </InputItem>

                <InputItem 
                    placeholder="请输入建筑面积" 
                    extra="㎡" 
                    type="number"
                    value={size}
                    onChange={(val) => this.getValue('size', val)}
                >
                    建筑面积
                </InputItem>

                <Picker 
                    data={roomTypeData} 
                    value={[roomType]} 
                    cols={1} 
                    onChange={(val) => this.getValue('roomType', val[0])}
                >
                    <Item arrow="horizontal">户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型</Item>
                </Picker>

                <Picker 
                    data={floorData} 
                    value={[floor]} 
                    cols={1} 
                    onChange={(val) => this.getValue('floor', val[0])}
                >
                    <Item arrow="horizontal">所在楼层</Item>
                </Picker>

                <Picker 
                    data={orientedData} 
                    value={[oriented]} 
                    cols={1} 
                    onChange={(val) => this.getValue('oriented', val[0])}
                >
                    <Item arrow="horizontal">朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向</Item>
                </Picker>
            </List>

            <List renderHeader={() => '房屋标题'}>
                <InputItem 
                    placeholder="请输入房屋标题（例如：合租 小区名 3室 2000元）" 
                    value={title} 
                    onChange={(val) => this.getValue('title', val)}
                ></InputItem>
            </List>

            <List renderHeader={() => '房屋图像'}>
                <ImagePicker 
                    files={tempSlides}
                    multiple={true}
                    onChange={this.handleHouseImg}
                    className={styles.imagePicker}
                />
            </List>

            <List renderHeader={() => '房屋配置'} className={styles.supporting}>
                <HousePackage select={true} onSelect={this.handleSupporting} />
            </List>

            <List renderHeader={() => '房屋描述'}>
                <TextareaItem
                    rows={5}
                    placeholder="请输入房屋描述信息"
                    value={description} 
                    onChange={(val) => this.getValue('description', val)}
                />
            </List>

            <FilterFooter 
                className={styles.buttons}
                cancelText="取消"
                okText="提交"
                onCancel={this.onCancel}
                onOk={this.onSubmit}
            />
            </div>
        )
    }
}
