// 房屋配置组件（热水器、洗衣机……）
import React, { Component } from 'react'
import styles from './index.module.css'

const HOUSE_PACKAGE = [
    {
        id: 1,
        name: '衣柜',
        icon: 'icon-wardrobe'
    },
    {
        id: 2,
        name: '洗衣机',
        icon: 'icon-wash'
    },    
    {
        id: 3,
        name: '空调',
        icon: 'icon-air'
    },    
    {
        id: 4,
        name: '天然气',
        icon: 'icon-gas'
    },    
    {
        id: 5,
        name: '冰箱',
        icon: 'icon-ref'
    },
    {
        id: 6,
        name: '暖气',
        icon: 'icon-Heat'
    },
    {
        id: 7,
        name: '电视',
        icon: 'icon-vid'
    },
    {
        id: 8,
        name: '热水器',
        icon: 'icon-heater'
    },
    {
        id: 9,
        name: '宽带',
        icon: 'icon-broadband'
    },
    {
        id: 10,
        name: '沙发',
        icon: 'icon-sofa'
    }
];

export default class HousePackage extends Component {
    state = {
        selectedNames: []
    }

    // 根据id判断选中状态
    toggleSelect = name => {
        const { selectedNames } = this.state;
        let newSelectedNames = [];

        if (selectedNames.includes(name)) {
            let index = selectedNames.indexOf(name);
            newSelectedNames = selectedNames.splice(index, 1);
        } else {
            newSelectedNames = [...selectedNames, name];
        }

        // 将数据传递给父组件
        this.props.onSelect(newSelectedNames);

        this.setState({
            selectedNames: newSelectedNames
        })
    }

    renderItems () {
        const {list} = this.props;
        if (list.length > 0) {
            const values = HOUSE_PACKAGE.filter(item => list.includes(item.name));
            return values.map( item => {
                return (
                    <div key={item.id} className={styles.item}>
                        <i className={['iconfont', styles.icon, item.icon].join(' ')} />
                        {item.name}
                    </div>
                )
            })
        } else {
            const { selectedNames } = this.state;
            HOUSE_PACKAGE.map( item => {
                const isActive = selectedNames.includes(item.name);
                return (
                    <div className={[styles.item, isActive ? styles.isActive : ''].join(' ')}>
                        <i className={['iconfont', styles.icon, item.icon].join(' ')}>
                        {item.name}
                        </i>
                    </div>
                )
            })
        }

    }
    render() {
        return <ul className={styles.root}>{this.renderItems()}</ul>
    }
}
