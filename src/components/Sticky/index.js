import React, { Component } from 'react'
import PropTypes, { resetWarningCache } from 'prop-types'
import styles from './index.module.css'

export default class Sticky extends Component {
    static propTypes = {
        height: PropTypes.number.isRequired
    }

    handleScroll = () => {
        const placeholderDOM = this.placeholder;
        const contentDOM = this.content;
        const { height } = this.props;

        const { top } = placeholderDOM.getBoundingClientRect();
        if (top < 0) {
            //吸顶
            contentDOM.classList.add(styles.fixed);
            placeholderDOM.style.height = `${height}px`;
        } else {
            contentDOM.classList.remove(styles.fixed);
            placeholderDOM.style.height = '0px'
        }
    }

    // 监听 scroll 事件
    componentDidMount () {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll)
    }

    render() {
        return (
            <div>
                {/* 占位元素 */}
                <div ref={ c => this.placeholder = c} />
                {/* 内容元素 */}
                <div ref={ c => this.content = c} >{ this.props.children }</div>
            </div>
        )
    }
}
