import React from 'react'
import './innerNav.scss'

export const InnerNav = (props) => {
    return (
        <div className={"inner-nav " + props.className}>
            {props.children}
        </div>
    )
}
