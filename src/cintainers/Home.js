import logo from '../logo.svg';
import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab'
import TotalPrice from '../components/TotalPrice';
import CreateButton from '../components/CreateButton';
import MonthPicker from '../components/MonthPicker';
import Loader from '../components/Loader';

import withContext from '../WithContext'
// 可以用Tabs组件替代
import {LIST_VIEW} from '../util'

import React from 'react';

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
            tabView: LIST_VIEW
        }
    }
    componentDidMount() {
        this.props.actions.getInitialData()
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
        const {data} = this.props
        const {items, categories, currentDate, isLoading} = data
        const {tabView} = this.state

        console.log('items', items)
        // 添加目录类型并且过滤时间
        const itemsWithCategory = items.map(item => {
            item.category = categories[item.cid]
            return item
        })
        return (
            // 空节点
            <React.Fragment>
                <header className="home-header">
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
                <div className="home-content">
                    { isLoading &&
                    <Loader/>
                    }
                    { !isLoading && 
                    <React.Fragment>
                        <ViewTab activeTab={tabView} onChangeTab = {this.changeTab}></ViewTab>
                        { itemsWithCategory.length<=0 &&
                        <div className="alert alert-light text-center">
                            您还没有任何记账记录
                        </div>
                        }
                        <CreateButton onClick={this.addItem}></CreateButton>
                        { itemsWithCategory.length>0 &&
                        <PriceList
                        items = {itemsWithCategory}
                        onModifyItem = {this.modifyItem}
                        onDeleteItem = {this.deleteItem}
                        ></PriceList>
                        }
                    </React.Fragment>
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default withContext(Home)