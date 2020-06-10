import React from 'react';
import PropTypes from 'prop-types';
import Ionicon from 'react-ionicons'
import { Colors } from '../util'


class CategorySelect extends React.Component {
  render() {
    const {categories, activeCategoryId, onCategoryChange} = this.props
    return (
        <div className="row category-select">
            {
                categories.map(cate => {
                    const activeBackColor = cate.id === activeCategoryId ? Colors.blue : Colors.lightGray
                    const activeIconColor = cate.id === activeCategoryId ? Colors.white : Colors.black
                    return (
                        // 事件的第一个参数固定为e
                        <div className="col-3 category-select" key={cate.id} onClick={(e) => {onCategoryChange(cate.id)}}>
                            <Ionicon
                                className="rounded-circle"
                                fontSize="50px"
                                style={{ backgroundColor: activeBackColor, padding: '5px' }} 
                                color={activeIconColor}
                                icon={cate.iconName}
                            ></Ionicon>
                            <p>{cate.name}</p>
                        </div>
                    )
                })
            }
        </div>
    )
  }
}

CategorySelect.propTypes = {
    categories: PropTypes.array.isRequired,
    activeCategoryId: PropTypes.string,
    onCategoryChange: PropTypes.func.isRequired,
}

export default CategorySelect