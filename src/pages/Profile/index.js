import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Button, Modal } from 'antd-mobile'

import { BASE_URL } from '../../utils/url'
import { isAuth, removeToken } from '../../utils/auth'
import styles from './index.module.css'
import API from '../../utils/api'

// 菜单数据
const menus = [
    {
        id: 1,
        name: '我的收藏',
        iconfont: 'icon-coll',
        to: "/favorite" 
    },
    {
        id: 2,
        name: '我的出租',
        iconfont: 'icon-ind',
        to: "/rent" 
    },
    {
        id: 3,
        name: '看房记录',
        iconfont: 'icon-record'
    },
    {
        id: 4,
        name: '成为房主',
        iconfont: 'icon-identity'
    },
    {
        id: 5,
        name: '个人资料',
        iconfont: 'icon-myinfo'
    },
    {
        id: 6,
        name: '联系我们',
        iconfont: 'icon-cust'
    }
];
// 默认头像信息
const DEFAULT_AVATAR = BASE_URL + '/img/profile/avatar.png';

const alert = Modal.alert;
export default class Profile extends Component {
    state={
        isLogin: isAuth(),
        userInfo: {
            avatar: '',
            nickname: ''
        }
    }

    componentDidMount () {
        this.getUserInfo();
    }

    getUserInfo = async () => {
        if (!this.state.isLogin) {
            // 未登录
            return
        } else {
            // 发送请求，获取用户数据
            const res = await API.get('/user');

            if (res.data.status === 200) {
                const { avatar, nickname } = res.data.body;
                this.setState({
                    userInfo: {
                        avatar: BASE_URL+avatar,
                        nickname
                    }
                });
            } else {
                // token 失效
                this.setState({
                    isLogin: false
                })
            }
        }
    }

    logout = () => {

        alert('提示', '是否确定退出?', [
            { text: '取消'},
            { text: '确定', onPress: async () => {
                // 调用退出登录接口
                await API.post('/user/logout')

                // 移除本地token 
                removeToken();

                // 清楚state
                this.setState({
                    isLogin: false,
                    userInfo: {
                        avatar: '',
                        nickname: ''
                    }
                })
            } }
        ])
    }
    render() {
        const { history } = this.props;
        const { isLogin, userInfo: { avatar, nickname } } = this.state;

        return (
            <div className={styles.root}>
                {/* 个人信息 */}
                <div className={styles.title}>
                    <img 
                        className={styles.bg}
                        src={BASE_URL + '/img/profile/bg.png'}
                        alt="背景图"
                    />
                    <div className={styles.info}> 
                        <div className={styles.myIcon}>
                            <img className={styles.avatar} src={ avatar || DEFAULT_AVATAR} alt="icon" />
                        </div>
                        <div className={styles.user}>
                            <div className={styles.name}>{ nickname || '游客' }</div>
                            {
                                isLogin ? 
                                <>
                                    <div className={styles.edit}>
                                        <span className={styles.arrow}>
                                            编辑个人资料
                                        </span>
                                        <Button type="primary" size="small" inline  
                                            onClick={this.logout}
                                        >退出登录</Button>
                                    </div>
                                </> : 
                                <div className={styles.edit}>
                                    <Button type="primary" size="small" inline  
                                        onClick={() => history.push('/login')}
                                    >去登录</Button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {/* 宫格菜单 */}
                <Grid 
                    data={ menus }
                    columnNum={3}
                    hasLine={false}
                    renderItem={ item =>
                        item.to ? (
                            <Link to={item.to}>
                                <div className={styles.menuItem}>
                                    <i className={`iconfont ${item.iconfont}`} />
                                    <span>{item.name}</span>
                                </div>
                            </Link>

                            ) : (
                                <div className={styles.menuItem}>
                                    <i className={`iconfont ${item.iconfont}`} />
                                    <span>{item.name}</span>
                                </div>
                            ) 
                    }
                />

                {/* Fork me */}
                <div className={styles.forkMe}>
                    欢迎访问仓库 <a href="https://gitee.com/jerry306">润润</a>
                </div>
            </div>
        )
    }
}
