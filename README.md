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