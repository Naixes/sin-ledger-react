import React from 'react';
import {AppContext} from './AppContent';

// 高阶组件
// 传入一个组件
const withContext = (Component => {
    // 返回一个组件
    return (props) => (
        <AppContext.Consumer>
            {({state, actions}) => {
                // 添加参数，返回原组件
                return <Component {...props} data={state} actions={actions}></Component>
            }}
        </AppContext.Consumer>
    )
})

export default withContext