import React, { Component } from 'react'
import {Flex} from 'antd-mobile'
import PropTypes from 'prop-types'
import styles from './index.module.css'


export default class FilterFooter extends Component {

    static propTypes = {
        cancelText: PropTypes.string,
        okText: PropTypes.string,
        onCancel: PropTypes.func.isRequired,
        onOk: PropTypes.func.isRequired,
        className: PropTypes.string
    }
    
    render() {
        const {cancelText, okText, onCancel, onOk, className} = this.props;
        return (
            <Flex className={[styles.root, className ||''].join(' ')}>
                {/* 取消按钮 */}
                <span className={[styles.btn, styles.cancel].join(' ')} onClick={onCancel}>
                    {cancelText ? cancelText : '取消'}
                </span>

                {/* 确定按钮 */}
                <span className={[styles.btn, styles.ok].join(' ')} onClick={onOk}>
                    {okText ? okText : '确定'}
                </span>
            </Flex>
        )
    }
}

