import React from 'react';

import {Tabs, Tab} from '../components/Tabs';

class Create extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    render() {

        return (
            <Tabs defaultTabIndex={0} onTabChange={(cur) =>{console.log(cur)}}>
                <Tab>收入</Tab>
                <Tab>支出</Tab>
            </Tabs>
        )
    }
}

export default Create