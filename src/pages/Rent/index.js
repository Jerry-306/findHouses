import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from '../../utils/api'
import { BASE_URL } from '../../utils/url'
import HouseItem from '../../components/HouseItem'
import MyNavBar from '../../components/MyNavBar'
import NoHouse from '../../components/NoHouse'
import styles from './index.module.css'
import { Toast } from 'antd-mobile'

export default class Rent extends Component {
    state = {
        // 出租房屋列表
        list: [],
        isLoading: false
    }

    // 获取已发布房源列表信息
    async getHouseList () {
        this.setState({
            isLoading: true
        })
        Toast.loading('Loading...', 0, null, false);
        const res = await API.get('/user/houses');

        Toast.hide();
        this.setState({
            isLoading: false
        })
        const { status, body } = res.data;
        if (status === 200) {
            this.setState({
                list: body
            })
        } else {
            const { history, location } = this.props;
            history.replace('/login', {
                from: location
            })
        }
    }

    componentDidMount () {
        this.getHouseList();
    }

    renderHouseItem () {
        const { list } = this.state;
        const { history } = this.props;
        return list.map(item => (
            <HouseItem
                key={item.houseCode}
                src={BASE_URL + item.houseImg}
                onClick={() => history.push(`/detail/${item.houseCode}`)}
                title={item.title}
                desc={item.desc}
                tags={item.tags}
                price={item.price}
            />
        ))
    }

    renderHouseList () {
        const { list, isLoading } = this.state;

        if (list.length === 0 && !isLoading) {
            return (
                <NoHouse>
                    您还没有发布房源,
                    <Link to="/rent/add" className={styles.link}>  去发布房源吧~</Link>
                </NoHouse>
            )
        } else {
            return <div className={styles.houses}>{this.renderHouseItem()}</div>
        }
    }

    render() {
        return (
            <div className={styles.root}>
                <MyNavBar onLeftClick={ () => this.props.history.goBack()}>房屋管理</MyNavBar>
                {this.renderHouseList()}
            </div>
        )
    }
}
