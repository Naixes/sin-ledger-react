import React from 'react';
import PropTypes from 'prop-types';
import Ionicons from 'react-ionicons'

const CreateButton = ({onClick}) => {
    return (
        <button style={{borderRadius: '0'}} className="btn btn-primary btn-block d-flex justify-content-center align-items-center" onClick={(e) => {onClick()}}>
            <Ionicons 
                className="rounded-circle"
                fontSize="30px"
                color='#fff'
                icon="ios-add-circle"
            ></Ionicons>
            创建一条新的记账纪录
        </button>
    )
}

CreateButton.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default CreateButton