import React from 'react'
import Ionicon from 'react-ionicons'

import {testCategories, testItems} from '../../testData'
import { shallow } from 'enzyme'
import PriceList from '../PriceList'

// 添加目录类型
const itemsWithCategory = testItems.map(item => {
    item.category = testCategories[item.cid]
    return item
})

const props = {
    items: itemsWithCategory,
    // Mock函数：jest.fn()（捕获函数调用情况）、jest.spyOn()（捕获函数调用情况，执行函数）、jest.mock()（mock整个模块）
    onModifyItem: jest.fn(),
    onDeleteItem: jest.fn()
}

let wrapper
describe('test PriceList component', () => {
    beforeEach(() => {
        wrapper = shallow(<PriceList {...props}/>)
    })
    it('render the component to match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
    // 列表渲染正确数量的行数
    it('render correct item length', () => {
        expect((wrapper.find('.list-group-item').length)).toEqual(itemsWithCategory.length)
    })
    // 渲染正确数量的图标和图标名称
    it('render correct icon length and icon name', () => {
        // find也可以查询组件
        const iconList = wrapper.find('.list-group-item').first().find(Ionicon)
        expect(iconList.length).toEqual(3)
        expect(iconList.first().props.icon).toEqual(itemsWithCategory[0].iconName)
    })
    // 点击交互会执行对应的方法
    it('trigger correct function callbacks', () => {
        const firstItem = wrapper.find('.list-group-item').first()
        // 模拟点击
        firstItem.find('a').first().simulate('click', {
            preventDefault: () => {}
        })
        // 查看函数调用情况
        expect(props.onModifyItem).toHaveBeenCalledWith(itemsWithCategory[0].id)
        firstItem.find('a').last().simulate('click', {
            preventDefault: () => {}
        })
        expect(props.onDeleteItem).toHaveBeenCalledWith(itemsWithCategory[0].id)
    })
});


