import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Home from './cintainers/Home';
import Create from './cintainers/Create';

import {parseToYearAndMonth, flatternArr} from './util'
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
      // 添加数据
      addItem: withLoading(async(values, ) => {
        
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
        this.setState({
          categories: allCategories,
          isLoading: false
        })
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
