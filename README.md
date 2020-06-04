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

#### MouthSelect

创建按钮

创建下拉菜单

下拉菜单显示两列

添加选择高亮

添加交互

优化

### 首页--Home

组合组件

<React.Fragment>：空节点

#### State设计原则

最小化State原则

传递state

#### 分析数据流

分析添加组件方法（单项数据流）