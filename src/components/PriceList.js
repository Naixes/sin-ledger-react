import React from 'react'
import PropTypes from 'prop-types'
import Ionicon from 'react-ionicons'
import {Colors} from '../util'

const PriceList = ({items, onModifyItem, onDeleteItem}) => {
    return (
        <ul className="list-group">
            {items.map(item => (
                // flex布局
                <li key= {item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {/* 栅格系统 */}
                    <span className="col-1">
                        <Ionicon
                            // 圆
                            className="rounded-circle"
                            fontSize="30px"
                            style={{backgroundColor: Colors.blue, padding: '5px'}}
                            color={'#fff'}
                            icon={item.category.iconName}
                        ></Ionicon>
                    </span>
                    <span className="col-4">{item.title}</span>
                    <span className="col-3 font-weight-bold">{item.category.type === 'outcome' ? '-' : '+'}{item.price}元</span>
                    <span className="col-2">{item.date}</span>
                    {/* eslint-disable-next-line */}
                    <a 
                        href='#'
                        className="col-1" 
                        role="button" 
                        onClick={(e) => { e.preventDefault(); onModifyItem(item.id)}}
                    >
                        <Ionicon
                            className="rounded-circle"
                            fontSize="30px"
                            style={{backgroundColor: Colors.blue, padding: '5px'}}
                            color={'#fff'}
                            icon='ios-create-outline'
                        ></Ionicon>
                    </a>
                    {/* eslint-disable-next-line */}
                    <a 
                        href='#'
                        className="col-1" 
                        role="button" 
                        onClick={(e) => { e.preventDefault(); onDeleteItem(item.id)}}
                    >
                        <Ionicon
                            className="rounded-circle"
                            fontSize="30px"
                            style={{backgroundColor: Colors.blue, padding: '5px'}}
                            color={'#fff'}
                            icon='ios-close'
                        ></Ionicon>
                    </a>
                </li>
            ))}
        </ul>
    )
}

// 属性类型检查
PriceList.propTypes = {
    items: PropTypes.array.isRequired,
    onModifyItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired
}

export default PriceList