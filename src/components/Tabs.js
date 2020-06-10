import React from 'react';
import PropTypes from 'prop-types'

// 对ViewTab的重构
export class Tabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        activeTabIndex: props.defaultTabIndex
    }
  }
  tabChange(e, index) {
    e.preventDefault()
    this.setState({
        activeTabIndex: index
    })
    this.props.onTabChange(index)
  }
  render() {
    const {children} = this.props
    const {activeTabIndex} = this.state
    return (
      <ul className="nav nav-tabs nav-fill my-4">
          {/* React.Children.map：React.Children 提供的用于处理 this.props.children 不透明数据结构的实用方法之一 */}
          {React.Children.map(children, (child, index) => {
              const activeClassName = index === activeTabIndex ? 'nav-link active' : 'nav-link'
              return (
                  <li className="nav-item">
                    {/* eslint-disable-next-line */}
                    <a 
                        className={activeClassName} 
                        href='#'
                        onClick={(e) => {this.tabChange(e, index)}}
                    >
                        {child}
                    </a>
                  </li>
              )
          })}
      </ul>
    )
  }
}

Tabs.propTypes = {
    defaultTabIndex: PropTypes.number.isRequired,
    onTabChange: PropTypes.func.isRequired,
}

export const Tab = ({children}) => {
    return (
        <React.Fragment>{children}</React.Fragment>
    )
}