import React, { Component } from 'react'

import {PickerView} from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterPicker extends Component {
    state = {
        value: this.props.ddefaultValue
    }
    render() {
        const {onCancel, onSave, data, cols, type} = this.props
        return (
            <>
                <PickerView data={data} value={this.state.value} cols={cols}
                onChange={ value => this.setState({value})}/>
                <FilterFooter onCancel={() => onCancel()} onOK={() => onSave(type, this.state.value)} />
            </>
        )
    }
}
