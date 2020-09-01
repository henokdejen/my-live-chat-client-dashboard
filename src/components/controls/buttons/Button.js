import React from 'react';

import './Button.scss';

const Button = (props) => {
    return (
        <>
            <button className="primary-button" {...props}>{ props.children }</button>
        </>
    );
}

export default Button;