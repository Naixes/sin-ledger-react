import logo from '../logo.svg';
import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab'
import TotalPrice from '../components/TotalPrice';
import CreateButton from '../components/CreateButton';
import MonthPicker from '../components/MonthPicker';
import Loader from '../components/Loader';
import PieChart from '../components/PieChart';

import withContext from '../WithContext'
// 可以用Tabs组件替代
import {LIST_VIEW, CHART_VIEW, TYPE_OUTCOME, TYPE_INCOME} from '../util'

import React from 'react';

const getChartData = (itemsWithCategory, type) => {
    let categoryMap = {}
    itemsWithCategory.filter(item => item.category.type === type).forEach(typeItem => {
        if(categoryMap[typeItem.cid]) {
            categoryMap[typeItem.cid].value += (typeItem.price * 1)
        }else {
            categoryMap[typeItem.cid] = {
                name: typeItem.category.name,
                value: typeItem.price * 1
            }
        }
    })
    return Object.keys(categoryMap).map(key => ({name: categoryMap[key].name, value: categoryMap[key].value}))
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

        // 添加目录类型，返回数组
        const itemsWithCategory = Object.keys(items).map(id => {
            items[id].category = categories[items[id].cid]
            return items[id]
        })

        // 总计
        let totalIncome = 0, totalOutcome = 0
        itemsWithCategory.forEach(item => {
            if (item.category.type === TYPE_OUTCOME) {
                totalOutcome += item.price
            } else {
                totalIncome += item.price
            }
        });

        // 图表数据
        const incomeChartData = getChartData(itemsWithCategory, TYPE_INCOME)
        const outcomeChartData = getChartData(itemsWithCategory, TYPE_OUTCOME)

        return (
            // 空节点
            <React.Fragment>
                <header className="home-header">
                    <div className="row mt-3 mb-3 justify-content-center">
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                    <div className="row align-items-end">
                        <div className="col">
                        <MonthPicker year={currentDate.year} month={currentDate.month} onChange={this.changeDate}></MonthPicker>
                        </div>
                        <div className="col">
                        <TotalPrice income={totalIncome} outcome={totalOutcome}></TotalPrice>
                        </div>
                    </div>
                </header>
                <div className="home-content py-4 px-3">
                    { isLoading &&
                    <Loader/>
                    }
                    { !isLoading && 
                    <React.Fragment>
                        <ViewTab activeTab={tabView} onChangeTab = {this.changeTab}></ViewTab>
                        <CreateButton onClick={this.addItem}></CreateButton>
                        {/* 列表 */}
                        { tabView === LIST_VIEW && itemsWithCategory.length<=0 &&
                        <div className="alert alert-light text-center">
                            您还没有任何记账记录
                        </div>
                        }
                        { tabView === LIST_VIEW && itemsWithCategory.length>0 &&
                        <PriceList
                        items = {itemsWithCategory}
                        onModifyItem = {this.modifyItem}
                        onDeleteItem = {this.deleteItem}
                        ></PriceList>
                        }
                        {/* 图表 */}
                        { tabView === CHART_VIEW &&
                        <React.Fragment>
                            <PieChart title="收入" data={incomeChartData}></PieChart>
                            <PieChart title="支出" data={outcomeChartData}></PieChart>
                        </React.Fragment>
                        }
                    </React.Fragment>
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default withContext(Home)