import React, { Component } from 'react'
import styles from './index.module.css'

// 错误边界
export default class ErrorBoundary extends Component {
    state = {
        error: null,
        errorInfo: null
    }
    componentDidCatch (error, errorInfo) {
        this.setState({
            error,
            errorInfo
        })
    }
    render() {
        if (this.state.errorInfo) {
            return (
                <div className={styles.root}>
                    <h2 className={styles.title}>Something went wrong.</h2>
                    <details className={styles.details}>
                        {this.state.error && this.state.error.toString()}
                        <br/>
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            )
        } else {
            return this.props.children
        }
    }
}
