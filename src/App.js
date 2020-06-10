import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Home from './cintainers/Home';
import Create from './cintainers/Create';

import {parseToYearAndMonth} from './util'
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
          items: items.data,
          categories: categories.data,
          isLoading: false
        })
      })
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
