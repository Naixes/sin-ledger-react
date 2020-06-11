import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Home from './cintainers/Home';
import Create from './cintainers/Create';

import {parseToYearAndMonth, flatternArr, ID} from './util'
import {AppContext} from './AppContent'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      categories: [],
      isLoading: false,
      currentDate: parseToYearAndMonth()
    }

    // 高阶函数：loading
    const withLoading = (cb) =>{
      // 返回一个函数
      return (...args) => {
        // 设置loading
        this.setState({
          isLoading: false
        })
        // 调用原函数
        return cb(...args)
      }
    }

    this.actions = {
      // 获取初始数据
      getInitialData: withLoading(async() => {
        const {currentDate} = this.state
        const results = await Promise.all([axios.get('/categories'), axios.get(`/items?dateCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`)])
        const [categories, items] = results
        this.setState({
          items: flatternArr(items.data),
          categories: flatternArr(categories.data),
          isLoading: false
        })
      }),
      // 删除数据
      deleteItem: withLoading(async(id) => {
        const deletItem = await axios.delete(`/items/${id}`)
        delete this.state.items[id]
        this.setState({
          items: this.state.items,
          isLoading: false
        })
        return deletItem.data
      }),
      // 选择日期
      selectDate: withLoading(async(year, month) => {
        const results = await axios.get(`/items?dateCategory=${year}-${month}&_sort=timestamp&_order=desc`)
        console.log(results)
        this.setState({
          items: flatternArr(results.data),
          currentDate: { year, month },
          isLoading: false
        })
      }),
      // 更新数据
      updateItem: withLoading(async(values, cateId) => {
        const parseDate = parseToYearAndMonth(values.date)
        values.timestamp = new Date(values.date).getTime()
        values.dateCategory = `${parseDate.year}-${parseDate.month}`
        const newItem = await axios.put(`/items/${values.id}`, {...values, cid: cateId})
        this.setState({
          items: {
            ...this.state.items,
            [values.id]: newItem.data
          },
          isLoading: false
        })
        return newItem.data
      }),
      // 添加数据
      addItem: withLoading(async(values, cateId) => {
        const newId = ID()
        const parseDate = parseToYearAndMonth(values.date)
        values.id = newId
        values.timestamp = new Date(values.date).getTime()
        values.dateCategory = `${parseDate.year}-${parseDate.month}`
        const newItem = await axios.post('/items', {...values, cid: cateId})
        console.log(111,this.state.items)
        this.setState({
          items: {
            ...this.state.items,
            [newId]: newItem.data
          },
          isLoading: false
        })
        return newItem.data
      }),
      // 获取编辑页面数据，包括分类数据和编辑数据
      getEditData: withLoading(async(id) => {
        const {categories, items} = this.state
        let promiseArr = []
        // 所有分类数据
        if(Object.keys(categories).length < 1) {
          promiseArr.push(axios.get('/categories'))
        }
        // 编辑数据
        const itemAlreadyFetched = (Object.keys(items).indexOf(id)>-1)
        if(id && !itemAlreadyFetched) {
          promiseArr.push(axios.get(`/items/${id}`))
        }
        const [ fetchedCategories , item ] = await Promise.all(promiseArr)
        // 整合数据
        const editItem = item ? item.data : items[id]
        const allCategories = fetchedCategories ? flatternArr(fetchedCategories.data) : categories
        // 更新数据
        if(id) {
          this.setState({
            categories: allCategories,
            isLoading: false,
            items: {...this.state.items, [id]: editItem}
          })
        }else {
          this.setState({
            categories: allCategories,
            isLoading: false
          })
        }
        return {item: editItem, categories: allCategories}
      }),
    }
  }

  render() {
    return (
      // Context：存储共通的数据
      <AppContext.Provider value={{
        state: this.state,
        actions: this.actions
      }}>
        <Router>
          <div className="App">
            <Route path="/" exact component={Home}></Route>
            <Route path="/create" component={Create}></Route>
            <Route path="/edit/:id" component={Create}></Route>
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
