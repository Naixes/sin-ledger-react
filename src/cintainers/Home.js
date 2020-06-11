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
        this.props.history.push('/create')
    }
    modifyItem = (id) => {
        this.props.history.push(`/edit/${id}`)
    }
    deleteItem = (id) => {
        this.props.actions.deleteItem(id)
    }
    changeDate = (year, month) => {
        this.props.actions.selectDate(year, month)
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

        console.log(items)

        // 添加目录类型
        const itemsWithCategory = Object.keys(items).map(id => {
            items[id].category = categories[items[id].cid]
            return items[id]
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