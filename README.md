## React理念

### 初步理解

1. 把UI划分出组件层级

2. 创建应用的静态版本
3. ...

### 拆分展示型组件

**首页**

MouthSelect

TotalNumber

ViewTab

CreateButton

PriceList--PriceItem

#### PriceList

分析属性：列表数据，编辑，删除方法

确定数据结构

开发

##### 选择图表库

使用svg代替font icon

icomoon，ionicons（本例使用）

安装react-ionicons，@2.1.6版本

引用，使用

##### 使用PropTypes检查属性类型

```react
import PropTypes from 'prop-typs'
...
PriceList.propTypes = {
  items: PropTypes.array.isRequired,
  onModifyItemL: PropTypes.func.isRequired,
  onDeleteItemL: PropTypes.func.isRequired
}

// defaultProps:默认属性
PriceList.defaultProps = {
  onModifyItemL: () => {}
}
```

#### TotalNumber

#### ViewTab

统一管理常量

```react
import React from 'react';
import PropTypes from 'prop-types'
import Ionicon from 'react-ionicons'
import {Colors, LIST_VIEW, CHART_VIEW} from '../util'

const generateLinkClass = (active, current) => {
    return (active === current) ? 'active nav-link' : 'nav-link'
}

const ViewTab = ({activeTab, onChangeTab}) => {
    return (
        <ul className="nav nav-tabs nav-fill my-4">
            <li className="nav-item">
                <a 
                    className={generateLinkClass(activeTab, LIST_VIEW)} 
                    href='#'
                    onClick={(e) => {e.preventDefault(); onChangeTab(LIST_VIEW)}}
                >
                    <Ionicon
                        // mr：margin-right
                        className="rounded-circle mr-2"
                        fontSize="25px"
                        color={Colors.blue}
                        icon='ios-paper'
                    ></Ionicon>
                    列表模式
                </a>
            </li>
            <li className="nav-item">
                <a 
                    className={generateLinkClass(activeTab, CHART_VIEW)}
                    href='#'
                    onClick={(e) => {e.preventDefault(); onChangeTab(CHART_VIEW)}}
                >
                    <Ionicon
                        className="rounded-circle mr-2"
                        fontSize="25px"
                        color={Colors.blue}
                        icon='ios-pie'
                    ></Ionicon>
                    图表模式
                </a>
            </li>
        </ul>
    )
}

ViewTab.propTypes = {
    active: PropTypes.string.isRequired,
    onChangeTab: PropTypes.func.isRequired
}

export default ViewTab
```

#### MouthSelect

创建按钮

创建下拉菜单

下拉菜单显示两列

添加选择高亮

添加交互

优化

```react
import React from 'react';
import PropTypes from 'prop-types';
import {range} from '../util'

class MonthPicker extends React.Component {
    constructor(props) {
        super(props)
        // 旧版本写法为回调ref
        this.picker = React.createRef()
        this.state = {
            isOpen: false,
            selectedYear: this.props.year
        }
    }
    componentDidMount() {
        document.addEventListener('click', this.handleClick, false)
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, false)
    }
    handleClick = (event) => {
        if(this.picker.current.contains(event.target)) {
            return 
        }
        this.setState({
            isOpen: false
        })
    }
    toggle = (event) => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    selectYear = (event, selected) => {
        event.preventDefault()
        this.setState({
            selectedYear: selected
        })
    }
    selectMonth = (event, selected) => {
        event.preventDefault()
        this.setState({
            isOpen: false
        })
        this.props.onChange(this.state.selectedYear, selected)
    }
    render() {
        const {year, month} = this.props
        const {isOpen, selectedYear} = this.state
        const monthRange = range(12, 1)
        const yearRange = range(9, -4).map(y => y + year)
        return (
            <div className="dropdown" ref={this.picker}>
                <p>选择日期</p>
                <button className="btn btn-lg btn-secondary dropdown-toggle" onClick={this.toggle}>{`${year}年${month}月`}</button>
                {isOpen && (
                <div className="dropdown-menu" style={{display: 'block'}}>
                    <div className="row">
                        <div className="col border-right">
                        {yearRange.map((yearNumber, index) => (
                            <a
                                className={yearNumber === selectedYear ? 'dropdown-item active' : 'dropdown-item'}
                                href="#"
                                key={index}
                                onClick={(e) => this.selectYear(e, yearNumber)}
                            >
                                {yearNumber}
                            </a>
                        ))}
                        </div>
                        <div className="col">
                        {monthRange.map((monthNumber, index) => (
                            <a
                                className={monthNumber === month ? 'dropdown-item active' : 'dropdown-item'}
                                href="#"
                                key={index}
                                onClick={(e) => this.selectMonth(e, monthNumber)}
                            >
                                {monthNumber}
                            </a>
                        ))}
                        </div>
                    </div>
                </div>
                )}
            </div>
        )
    }
}

MonthPicker.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default MonthPicker
```

### 首页--Home

组合组件

<React.Fragment>：空节点

#### State设计原则

最小化State原则

传递state

#### 分析数据流

分析添加组件方法（单项数据流）

### 组件测试

测试金字塔：UI(E2E)--Service--Unit

#### 通用测试框架Jest

断言库

`npm test xxx.js`

```js
expect().toBe()
expect().not.toBe()
expect().toBeTruthy()
expect().toBeFalsy()
expect().toBeGreaterThan()
expect().toBeLessThan()
expect().toEqual()
```

##### Snapshot testing

jest为react提供的特性

#### React测试工具

官方：ReactTestUtils

Enzyme基于官方的封装

##### Enzyme

两种测试方法

**Shallow Rendering**：不会渲染子组件，速度快

**DOM Rendering**：渲染Dom，包括子组件速度慢

`npm i enzyme enzyme-adapter-react-16 --save-dev`

src/新建文件setupTests.js

```react
import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()})
```

新建文件`components/__test__/xxx.text.js`

```react
import React from 'react'
import {shallow} from 'enzyme'
...
```

`npm test // 执行测试`

`npm test -t xxx // 单独测试某个文件`

#### 测试用例分析

列出测试项

**展示型组件**

**容器型组件**

测试默认状态

测试交互           

### React Router

- Components Base
- 声明式和可组合
- 支持多种应用：web，RN

安装react-router-dom                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

### 新建页

#### 重构ViewTab

#### CategorySelect

#### PriceForm

### 将方法和状态抽象到顶层

#### 状态提升

##### Flatten State

#### Context

#### HOC

就是一个函数，传入组件返回另外一个组件

### mock server

快速搭建

符合restful标准操作

支持restful路由规则

进阶扩展，比如自定义路由，中间件支持等

#### json-server

#### 分析接口

##### postman测试post接口

#### axios

fetch的缺点：

- 只对网络请求报错，400，500都视为成功的请求
- 默认不会带cookie
- 不支持abort，不支持超时操作
- 没办法原生监测请求进度

### 测试

测试高阶组件，需要导出原始组件，手动传入数据

### 图表

#### Recharts

**npm-state**可以查看包的下载量

**npm view xxx**可以查看发布频率

##### 组合式组件

#### 算法

### 部署

#### 生产环境和开发环境

`npm run build`

#### 服务器

##### shared host/VPS/cloud hosts

共享服务器

虚拟个人服务器

云服务器		

#### 使用jason-server部署到本地

#### 使用LeanCloud部署到云服务器

安装

注册

登陆

新建项目

修改代码

部署

绑定域名