import React from 'react';

import {Tabs, Tab} from '../components/Tabs';
import CategorySelect from '../components/CategorySelect';
import PriceForm from '../components/PriceForm';

const testCategories = [
    {
        "name": "旅行",
        "iconName": "ios-plane",
        "id": "1",
        "type": "outcome"
    },
    {
        "name": "餐饮",
        "iconName": "ios-restaurant",
        "id": "2",
        "type": "outcome"
    },
    {
        "name": "购物",
        "iconName": "ios-basket",
        "id": "3",
        "type": "outcome"
    },
    {
        "name": "数码",
        "iconName": "ios-phone-portrait",
        "id": "4",
        "type": "outcome"
    },
    {
        "name": "工资",
        "iconName": "ios-card",
        "id": "10",
        "type": "income"
    },
    {
        "name": "兼职",
        "iconName": "ios-cash",
        "id": "11",
        "type": "income"
    },
    {
        "name": "理财",
        "iconName": "logo-yen",
        "id": "12",
        "type": "income"
    },
]

const editItem = {}
  
class Create extends React.Component {
    constructor() {
        super()
        this.state = {
            defaultTabIndex: 0,
            activeCategoryId: '1'
        }
    }
    // 分类选择
    categoryChange = (id) => {
        this.setState({
            activeCategoryId: id
        })
    }
    // 表单
    submit = (values) => {
        console.log(values)
    }
    cancel = () => {}
    render() {
        const {defaultTabIndex, activeCategoryId} = this.state
        return (
            // py：padding-bottom/top
            <div className="create-page py-3 px-3">
                <Tabs defaultTabIndex={defaultTabIndex} onTabChange={(cur) =>{console.log(cur)}}>
                    <Tab>收入</Tab>
                    <Tab>支出</Tab>
                </Tabs>
                <CategorySelect activeCategoryId={activeCategoryId} categories={testCategories} onCategoryChange={this.categoryChange}></CategorySelect>
                <PriceForm onSubmit={this.submit} onCancel={this.cancel} item={editItem}></PriceForm>
            </div>
        )
    }
}

export default Create