import React from 'react';
import PropTypes from 'prop-types';

import {validateDate} from '../util'

class PriceForm extends React.Component {
  constructor() {
    super()
    this.state = {
        isValidate: true,
        errMessage: ''
    }
  }
  static propType = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    item: PropTypes.object,
  }
  // 默认的props  
  static defaultProps = {
      item: {}
  }
  submit = (e) => {
    e.preventDefault()
    const {onSubmit} = this.props
    const price = this.priceInput.value.trim() * 1
    const date = this.dateInput.value.trim()
    const title = this.titleInput.value.trim()

    if(price && title && date) {
        if(price < 0) {
            this.setState({
                isValidate: false,
                errMessage: "价格不能为负"
            })
        }else if(!validateDate(date)) {
            this.setState({
                isValidate: false,
                errMessage: "请填写正确的日期格式"
            })
        }else {
            this.setState({
                isValidate: true,
                errMessage: ''
            })
            onSubmit({price, date, title})
        }
    } else {
        this.setState({
            isValidate: false,
            errMessage: "请填写所有必填项"
        })
    }
  }
  render() {
    const { price, title, date } = this.props.item
    return (
        <form noValidate onSubmit={(e) => {this.submit(e)}}>
            <div className="form-group">
                <label htmlFor="title">标题 *</label>
                <input className="form-control" id="title" type="text" defaultValue={title} ref={(input) => {this.titleInput = input}} placeholder="请输入标题"/>
            </div>
            <div className="form-group">
                <label htmlFor="price">价格 *</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                    <span className="input-group-text">¥</span>
                    </div>
                    <input className="form-control" id="price" type="number" defaultValue={price} ref={(input) => {this.priceInput = input}} placeholder="请输入价格"/>
                </div>
            </div>
            <div className="form-group">
            <label htmlFor="date">日期 *</label>
            <input 
                type="date" className="form-control"  id="date" placeholder="请输入日期" defaultValue={date} ref={(input) => {this.dateInput = input}}  
            />
            </div>
            <button type="submit" className="btn btn-primary mr-3">提交</button>
            <button className="btn btn-secondary" onClick={this.props.onCancel}> 取消 </button>
            {/* 提示 */}
            { !this.state.isValidate && 
                <div className="alert alert-danger mt-3" role="alert">
                {this.state.errMessage}
                </div>
            }
        </form>
    )
  }
}

export default PriceForm