import React from 'react';
import PropTypes from 'prop-types'
import Ionicon from 'react-ionicons'
import {Colors, LIST_VIEW, CHART_VIEW} from '../util'

const generateLinkClass = (activeTab, current) => {
    return (activeTab === current) ? 'active nav-link' : 'nav-link'
}

const ViewTab = ({activeTab, onChangeTab}) => {
    return (
        <ul className="nav nav-tabs nav-fill my-4">
            <li className="nav-item">
                {/* eslint-disable-next-line */}
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
                {/* eslint-disable-next-line */}
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
    activeTab: PropTypes.string.isRequired,
    onChangeTab: PropTypes.func.isRequired
}

export default ViewTab