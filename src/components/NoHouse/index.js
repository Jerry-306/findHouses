import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {BASE_URL} from '../../utils/url'
import styles from './index.module.css'

export default class NoHouse extends Component {
    static propTypes = {
        children: PropTypes.string.isRequired
    }
    render() {
        return (
            <div className={styles.root}>
                <img
                    className={styles.img}
                    src={BASE_URL + '/img/not-found.png'}
                    alt="暂无数据"
                />
                <p className={styles.msg}>{this.props.children}</p>
            </div>
        )
    }
}
