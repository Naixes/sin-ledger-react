import logo from '../logo.svg';
import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab'
import TotalPrice from '../components/TotalPrice';
import CreateButton from '../components/CreateButton';
import MonthPicker from '../components/MonthPicker';
import {parseToYearAndMonth, padLeft, LIST_VIEW} from '../util'

import React from 'react';

const categories = {
    "1": {
      "id": 1,
      "name": "旅游",
      "type": "outcome",
      "iconName": "md-plane"
    },
    "2": {
      "id": 1,
      "name": "旅游",
      "type": "outcome",
      "iconName": "md-plane"
    }
}

const items = [{
  "id": 1,
  "title": "去云南旅游",
  "price": 200,
  "date": "2020-06-23",
  "cid": 1
}, {
  "id": 2,
  "title": "去云南旅游",
  "price": 400,
  "date": "2020-06-22",
  "cid": 2
}]
const newItem = {
  "id": 3,
  "title": "带妈妈去旅游",
  "price": 1500,
  "date": "2020-06-22", 
  "cid": 1
}

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            items,
            currentDate: parseToYearAndMonth(),
            tabView: LIST_VIEW
        }
    }
    addItem = () => {
        this.setState({
            items: [newItem, ...this.state.items]
        })
    }
    modifyItem = (id) => {
        const modifiedItems = this.state.items.map(item => {
            if(item.id === id) {
                item.title = "修改过的标题"
            }
            return item
        })
        this.setState({
            items: modifiedItems
        })
    }
    deleteItem = (id) => {
        const filterItems = this.state.items.filter(item => {
            return item.id !== id
        })
        this.setState({
            items: filterItems
        })
    }
    changeDate = (year, month) => {
        this.setState({
            currentDate: {year, month}
        })
    }
    changeTab = (tab) => {
        this.setState({
            tabView: tab
        })
    }
    render() {
        const {currentDate, tabView, items} = this.state
        // 添加目录类型并且过滤时间
        const itemsWithCategory = items.map(item => {
            item.category = categories[item.cid]
            return item
        }).filter(item => {
            return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
        })
        return (
            // 空节点
            <React.Fragment>
                <header className="App-header">
                <div className="row mb-5">
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col">
                        <MonthPicker year={currentDate.year} month={currentDate.month} onChange={this.changeDate}></MonthPicker>
                        </div>
                        <div className="col">
                        <TotalPrice income={0} outcome={0}></TotalPrice>
                        </div>
                    </div>
                </div>
                </header>
                <CreateButton onClick={this.addItem}></CreateButton>
                <ViewTab activeTab={tabView} onChangeTab = {this.changeTab}></ViewTab>
                <PriceList
                items = {itemsWithCategory}
                onModifyItem = {this.modifyItem}
                onDeleteItem = {this.deleteItem}
                ></PriceList>
            </React.Fragment>
        )
    }
}

export default Home