import React from 'react';
import ReactDOM from 'react-dom'

// shallow, mount, render
// shallow渲染叫浅渲染，仅对当前jsx结构内的顶级组件进行渲染，它的性能上最快的，大部分情况下，如果不深入组件内部测试，那么可以使用shallow渲染。
// mount则会进行完整渲染，而且完全依赖DOM API，也就是说mount渲染的结果和浏览器渲染结果说一样的，结合jsdom这个工具，可以对上面提到的有内部子组件实现复杂交互功能的组件进行测试。
// render也会进行完整渲染，但不依赖DOM API，而是渲染成HTML结构，并利用cheerio实现html节点的选择，它相当于只调用了组件的render方法，得到jsx并转码为html，所以组件的生命周期方法内的逻辑都测试不到，所以render常常只用来测试一些数据（结构）一致性对比的场景。
import {shallow, mount} from 'enzyme'
import MonthPicker from '../MonthPicker'

const props = {
    year: 2020, 
    month: 6, 
    onChange: jest.fn()
}

describe('test MonthPicker component', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<MonthPicker {...props}/>)
    })
    it('render the component to match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
    // 测试初始化状态
    it('render the correct year and month, show correct dropdown state', () => {
        expect(wrapper.find('.dropdown-toggle').first().text()).toEqual('2020年06月')
        expect(wrapper.find('.dropdown-menu').length).toEqual(0)
        expect(wrapper.state('isOpen')).toEqual(false)
        expect(wrapper.state('selectedYear')).toEqual(props.year)
    })
    // 模拟点击展开下拉
    it('after alick the button, dropdown shuold show, year list and month list should have correct item', () => {
        wrapper.find('.dropdown-toggle').simulate('click')
        expect(wrapper.find('.dropdown-menu').length).toEqual(1)
        expect(wrapper.state('isOpen')).toEqual(true)
        expect(wrapper.find('.years-range .dropdown-item').length).toEqual(9)
        expect(wrapper.find('.months-range .dropdown-item').length).toEqual(12)
        expect(wrapper.find('.years-range .dropdown-item.active').text())
        .toEqual('2020')
        expect(wrapper.find('.months-range .dropdown-item.active').text())
        .toEqual('06')
        expect(wrapper.find('.years-range .dropdown-item').first().text())
        .toEqual(`${props.year - 4}`)
        expect(wrapper.find('.months-range .dropdown-item').first().text())
        .toEqual('01')
    })
    // 选择年份或者月份
    it('click the year or month item, should trigger the right status change', () => {
        wrapper.find('.dropdown-toggle').simulate('click')
        wrapper.find('.years-range .dropdown-item').first().simulate('click', {
            preventDefault: () => {}
        })
        // 存在某个类名
        expect(wrapper.find('.years-range .dropdown-item').first().hasClass('active'))
        .toEqual(true)
        expect(wrapper.state('selectedYear')).toEqual(2016)
        wrapper.find('.months-range .dropdown-item').first().simulate('click')
        expect(wrapper.state('isOpen')).toEqual(false)
        expect(props.onChange).toHaveBeenCalledWith(2016, 1)
    })
    // 点击外部关闭下拉
    it('click the document should close the dropdown', () => {
        // 将事件监听封装到对象中
        let eventMap = {}
        document.addEventListener = jest.fn((event, cb) => {
            eventMap[event] = cb
        })
        // 需要挂载获取wrapper
        const wrapper = mount(<MonthPicker {...props}/>)
        wrapper.find('.dropdown-toggle').simulate('click')
        expect(wrapper.find('.dropdown-menu').length).toEqual(1)
        expect(wrapper.state('isOpen')).toEqual(true)
        // 触发事件
        eventMap.click({
            target: ReactDOM.findDOMNode(wrapper.instance())
        })
        expect(wrapper.state('isOpen')).toEqual(true)
        eventMap.click({
            target: document
        })
        expect(wrapper.state('isOpen')).toEqual(false)
    })
});
