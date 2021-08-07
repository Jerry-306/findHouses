import React, { Component } from 'react'
// import axios from 'axios'
import API from '../../utils/api'
import {Link} from 'react-router-dom'
import {Toast} from 'antd-mobile'

import {BASE_URL} from '../../utils/url'
import MyNavBar from '../../components/MyNavBar'
import HouseItem from '../../components/HouseItem'
import styles from './index.module.css'

// 覆盖物样式
const labelStyle = {
    cursor: 'pointer',
    border: '0px solid rgb(255, 0, 0)',
    padding: '0px',
    whiteSpace: 'nowrap',
    fontSize: '10px',
    color: 'rgb(255, 255, 255)',
    textAlign: 'center'
}

const BMapGL = window.BMapGL;
export default class Map extends Component {
    state = {
        // 小区下的房源列表
        housesList: [],
        // 表示是否展示房源列表
        isShowList: false
    }
    componentDidMount () {
        this.setMap()
    }

    // 创建地图并进行相应从初始化
    setMap () {
        // 初始化地图实例
        const map = new BMapGL.Map('container');
        // 获取当前定位城市
        const {label, value} = JSON.parse( localStorage.getItem('zfy_city') );
        // 在其他方法中通过 this 来获取到地图对象
        this.map = map;
        //创建地址解析器实例
        const myGeo = new BMapGL.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野
        myGeo.getPoint(label, async point => {
            if (point) {
                // 定位到中心点坐标
                map.centerAndZoom(point, 12);
                // 开启鼠标滚轮缩放
                map.enableScrollWheelZoom(true); 
                // 设置地图初始倾斜角度n
                map.setTilt(20); 
                // 添加比例尺控件
                map.addControl(new BMapGL.ScaleControl());
                // 添加缩放控件
                map.addControl(new BMapGL.ZoomControl());
                // 添加定位控件
                map.addControl(new BMapGL.LocationControl());

                // 调用 renderOverlays 方法
                this.renderOverlays(value);
            } else {
                Toast.info('您选择的地址没有解析到结果!', 1, null, false);
            }
        }, label);
        
        // 给地图绑定移动事件
        map.addEventListener('movestart', () => {
            if (this.state.isShowList) {
                this.setState({
                    isShowList: false
                })
            }
        })
    }  
    
    // 渲染覆盖物入口
    // 1 接收区域 id 参数，获取该区域下的房源数据
    // 2 获取房源类型以及下级地图缩放级别
    async renderOverlays(id) {
        try {
            Toast.loading('加载中...', 0, null, false);
            const res = await API.get(`/area/map?id=${id}`);
            Toast.hide();
            const data = res.data.body;
            
            // 调用 getTypeAndZoom 方法获取级别和类型
            const { nextZoom, type } = this.getTypeAndZoom();
            
            data.forEach(item => {
                // 创建覆盖物
                this.createOverlays(item, nextZoom, type);
            })
        } catch (error) {
            Toast.hide();
        }
    }

    // 计算要绘制的覆盖物类型和下一个缩放级别
    // 区   -> 12 ，范围：>=11 <13
    // 镇   -> 14 ，范围：>=13 <15
    // 小区 -> 16 ，范围：>=15 <17
    getTypeAndZoom() {
        // 调用地图的 getZoom() 方法，来获取当前缩放级别
        const zoom = this.map.getZoom();
        let nextZoom, type;

        if (zoom >= 11 && zoom < 13) {
            // 此时地图级别为区，下一个缩放级别为镇：
            nextZoom = 14;
            // circle 表示绘制圆形覆盖物的形状
            type = 'circle';
        } else if (zoom >= 13 && zoom < 15) {
            // 镇
            nextZoom = 16;
            type = 'circle';
        } else if (zoom >= 15 && zoom < 17) {
            // 小区
            type = 'rect';
        }

        return {
            nextZoom,
            type
        }
    }

    // 创建覆盖物
    createOverlays(item, zoom, type) {
        const {
            coord: { longitude, latitude },
            label: areaName,
            count,
            value
        } = item;

        // 创建坐标对象
        const areaPoint = new BMapGL.Point(longitude, latitude);
        if (type === 'circle') {
            this.createCircle(areaPoint, areaName, count, value, zoom)
        } else {
            this.createRect(areaPoint, areaName, count, value)
        }
    }

    // 创建圆形覆盖物（区、镇覆盖物）
    createCircle(point, name, count, id, zoom) {
        // 创建覆盖物
        const label = new BMapGL.Label('', {
            position: point,
            offset: new BMapGL.Size(-25, -25)
        })

        // 设置房源覆盖物内容
        label.setContent(`
            <div class="${styles.bubble}">
                <p class="${styles.name}">${name}</p>
                <p>${count}套</p>
            </div>
        `)

        // 设置样式
        label.setStyle(labelStyle);

        // 添加单击事件
        label.addEventListener('click', () => {
            // 调用 renderOverlays 方法，获取该区域下的房源数据
            this.renderOverlays(id);

            // 放大地图，以当前点击的覆盖物为中心放大地图
            this.map.centerAndZoom(point, zoom);

            // 解决清除覆盖物时，百度地图API的JS文件自身报错的问题
            setTimeout(() => {
                // 清除当前覆盖物信息
                this.map.clearOverlays()
            }, 0)
        })
        // 添加覆盖物到地图中
        this.map.addOverlay(label);
    }

    // 创建矩形覆盖物（小区覆盖物）
    createRect(point, name, count, id) {
        // 创建覆盖物
        const label = new BMapGL.Label('', {
            position: point,
            offset: new BMapGL.Size(-50, -28)
        })
    
        // 设置房源覆盖物内容
        label.setContent(`
            <div class="${styles.rect}">
                <span class="${styles.housename}">${name}</span>
                <span class="${styles.housenum}">${count}套</span>
                <i class="${styles.arrow}"></i>
            </div>
        `)
    
        // 设置样式
        label.setStyle(labelStyle);
    
        // 添加单击事件
        label.addEventListener('click', (e) => {
            this.getHousesList(id);
            // // 获取当前被点击项
            // console.log(e)
            // const target = e.changedTouches[0];
            // this.map.panBy(
            //     window.innerWidth / 2 - target.clientX,
            //     (window.innerHeight - 330) / 2 - target.clientY
            // )
        })
    
        // 添加覆盖物到地图中
        this.map.addOverlay(label)
    }

    // 获取小区房源数据
    async getHousesList (id) {
        try {
            Toast.loading('加载中...', 0, null, false); 
            const res = await API.get(`/houses?cityId=${id}`);
            Toast.hide();
            this.setState({
                housesList: res.data.body.list,
                // 展示房源列表
                isShowList: true
            })
        } catch (error) {
            Toast.hide();
        }
    }
    
    // 封装渲染房屋列表的方法
    renderHousesList() {
        return this.state.housesList.map(item => (
            <HouseItem
                key={item.houseCode}
                // 图片地址
                src={BASE_URL + item.houseImg}
                title={item.title}
                desc={item.desc}
                tags={item.tags}
                price={item.price}
            />
        ))
    }

    render() {
        return (
            <div className={styles.map}>
                {/* 顶部导航韩 */}
                <MyNavBar>
                    地图找房
                </MyNavBar>
                {/* 地图容器 */}
                <div id="container" className={styles.container} />  
                {/* 房源列表 */}
                {/* 添加 styles.show 展示房屋列表 */}
                <div
                className={[
                    styles.houseList,
                    this.state.isShowList ? styles.show : ''
                ].join(' ')}
                >
                    <div className={styles.titleWrap}>
                        <h1 className={styles.listTitle}>房屋列表</h1>
                        <Link className={styles.titleMore} to="/home/list">
                            更多房源
                        </Link>
                    </div>
                    <div className={styles.houseItems}>
                        {/* 房屋结构 */}
                        {this.renderHousesList()}
                    </div>
                </div>
            </div>
        )
    }
}
