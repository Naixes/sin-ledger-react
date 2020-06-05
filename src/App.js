import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import PriceList from './components/PriceList'
import ViewTab from './components/ViewTab'
import TotalPrice from './components/TotalPrice';
import CreateButton from './components/CreateButton';

const items = [{
  "id": 1,
  "title": "去云南旅游",
  "price": 200,
  "date": "2019-1-23",
  "category": {
    "id": 1,
    "name": "旅游",
    "type": "outcome",
    "iconName": "md-plane"
  }
}, {
  "id": 2,
  "title": "去云南旅游",
  "price": 400,
  "date": "2019-1-22",
  "category": {
    "id": 1,
    "name": "旅游",
    "type": "outcome",
    "iconName": "ios-plane"
  }
}]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <TotalPrice income={0} outcome={0}></TotalPrice>
        </div>
      </header>
      <PriceList
        items = {items}
        onModifyItem = {item => console.log(item)}
        onDeleteItem = {item => console.log(item)}
      ></PriceList>
      <CreateButton onClick={() => console.log('new')}></CreateButton>
      <ViewTab activeTab="LIST_VIEW" onChangeTab = {tab => console.log(tab)}></ViewTab>
    </div>
  );
}

export default App;
