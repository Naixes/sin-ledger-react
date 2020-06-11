import React from 'react';

import {Tabs, Tab} from '../components/Tabs';
import CategorySelect from '../components/CategorySelect';
import PriceForm from '../components/PriceForm';
import withContext from '../WithContext'
import { TYPE_INCOME, TYPE_OUTCOME } from '../util'

const tabs = [
    { label: '支出',
      value: TYPE_OUTCOME },
    { label: '收入',
      value: TYPE_INCOME},
]
  
class Create extends React.Component {
    constructor() {
        super()
        this.state = {
            // 类别index
            defaultTabIndex: 0,
            // 类目id
            activeCategoryId: ''
        }
    }
    // 类别选择
    tabChange = (index) => {
        this.setState({
            defaultTabIndex: index
        })
    }
    // 类目选择
    categoryChange = (id) => {
        this.setState({
            activeCategoryId: id
        })
    }
    // 表单
    submit = (values, isEdit) => {
        isEdit ? this.props.actions.updateItem(values, this.state.activeCategoryId) : this.props.actions.addItem(values, this.state.activeCategoryId)
        this.props.history.push('/')
    }
    cancel = () => {}
    componentDidMount() {
        const {id} = this.props.match.params
        this.props.actions.getEditData(id).then(({item, categories}) => {
            this.setState({
                // 类别
                defaultTabIndex: (id && item) ? tabs.findIndex(tab => categories[item.cid].type === tab.value) : 0,
                // 类目
                activeCategoryId: (id && item) ? item.cid : null,   
            })
        })
    }
    render() {
        const {data} = this.props
        const {categories, items} = data
        const {id} = this.props.match.params
        const {defaultTabIndex, activeCategoryId} = this.state

        // 过滤类目
        const filterCategories = Object.keys(categories).filter(key => (categories[key].type === tabs[defaultTabIndex].value)).map(key => categories[key])

        // 编辑
        const editItem = (id && items[id]) ? items[id] : {}

        return (
            // py：padding-bottom/top
            <div className="create-page py-3 px-3">
                <Tabs defaultTabIndex={defaultTabIndex} onTabChange={this.tabChange}>
                    { tabs.map(tab => (
                        <Tab key={tab.value}>{tab.label}</Tab>
                    ))
                    }
                </Tabs>
                <CategorySelect activeCategoryId={activeCategoryId} categories={filterCategories} onCategoryChange={this.categoryChange}></CategorySelect>
                <PriceForm onSubmit={this.submit} onCancel={this.cancel} item={editItem}></PriceForm>
            </div>
        )
    }
}

export default withContext(Create)