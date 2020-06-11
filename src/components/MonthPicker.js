import React from 'react';
import PropTypes from 'prop-types';
import {padLeft, range} from '../util'

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
    selectYear = (event, yearNumber) => {
        // event.preventDefault()
        this.setState({
            selectedYear: yearNumber
        })
    }
    selectMonth = (event, monthNumber) => {
        // event.preventDefault()
        this.setState({
            isOpen: false
        })
        this.props.onChange(this.state.selectedYear, monthNumber)
    }
    render() {
        const {year, month} = this.props
        const {isOpen, selectedYear} = this.state
        const monthRange = range(12, 1)
        const yearRange = range(9, -4).map(y => y + year)
        return (
            <div className="dropdown" ref={this.picker}>
                <p>选择日期</p>
                <button className="btn btn-lg btn-secondary dropdown-toggle" onClick={this.toggle}>{`${year}年${padLeft(month)}月`}</button>
                {isOpen && (
                <div className="dropdown-menu" style={{display: 'block'}}>
                    <div className="row">
                        <div className="col years-range border-right">
                        {yearRange.map((yearNumber, index) => (
                            // eslint-disable-next-line
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
                        <div className="col months-range">
                        {monthRange.map((monthNumber, index) => (
                            // eslint-disable-next-line
                            <a
                                className={monthNumber === month ? 'dropdown-item active' : 'dropdown-item'}
                                href="#"
                                key={index}
                                onClick={(e) => this.selectMonth(e, monthNumber)}
                            >
                                {padLeft(monthNumber)}
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