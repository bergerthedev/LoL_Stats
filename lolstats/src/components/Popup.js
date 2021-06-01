import React from 'react'

const Popup = (props) => {
    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                <h1>User not found. Check the spelling and region.</h1>
            </div>
        </div>
    )
}

export default Popup
