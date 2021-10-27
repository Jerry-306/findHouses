import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {NavBar} from 'antd-mobile'
import styles from './index.module.css'

class MyNavBar extends Component {
    // 属性校验
    static propTypes = {
        children: PropTypes.string.isRequired,
        onLeftClick: PropTypes.func,
        className: PropTypes.string,
        rightContent: PropTypes.array
    }

    // 默认点击返回按钮事件
    defaultClick = () => this.props.history.goBack();
    render() {
        const {children, className, rightContent, onLeftClick} = this.props;
        return (
            <div>
                <NavBar
                    className={[styles.navbar, className || ''].join(' ')}
                    mode="light"
                    icon={<i className="iconfont icon-back"/>}
                    onLeftClick={onLeftClick || this.defaultClick} 
                    rightContent={rightContent}
                >
                    {children}
                </NavBar>
            </div>
        )
    }
}

export default withRouter(MyNavBar);
/* 
此组件用于封装顶部导航栏
只有路由组件才有history 等API
于是， 利用 withRouter（）函数 包裹一般组件，就可以把一般组件变成路由组件 
*/