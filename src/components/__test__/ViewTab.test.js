import React from 'react'

import { shallow } from 'enzyme'
import ViewTab from '../ViewTab'
import {LIST_VIEW} from '../../util'

const props = {
    activeTab: LIST_VIEW,
    onChangeTab: jest.fn()
}

describe('test ViewTab component', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<ViewTab {...props}/>)
    })
    it('render the component to match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
});
