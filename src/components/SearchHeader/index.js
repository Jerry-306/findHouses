import React, { Component } from 'react'
import {Flex} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import './index.css'

class SearchHeader extends Component {
    static propTypes = {
        currentCity: PropTypes.string.isRequired,
        className: PropTypes.string
    }
    render () {
        const {currentCity, history, className}  = this.props;
        return (
            <Flex className={["search-box", className || ''].join(' ')}>
                {/* 左侧白色区域 */}
                <Flex className="search">
                    {/* 位置 */}
                    <div
                        className="location"
                        onClick={() => history.push('/citylist')}
                        >
                        <span className="name">{currentCity}</span>
                        <i className="iconfont icon-arrow" />
                    </div>
                    {/* 搜索表单 */}
                    <div
                        className="form"
                        onClick={() => history.push('/search')}
                        >
                        <i className="iconfont icon-seach" />
                        <span className="text">请输入小区或地址</span>
                    </div>
                </Flex>
                {/* 右侧地图图标 */}
                <i
                className="iconfont icon-map"
                onClick={() => history.push('/map')}
                />
            </Flex>
        )
    }
}

export default withRouter (SearchHeader);

