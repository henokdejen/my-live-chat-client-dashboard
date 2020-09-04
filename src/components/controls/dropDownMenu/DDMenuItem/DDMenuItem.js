import React from 'react'
import './ddMenuItem.scss'

export const DDMenuItem = ({children}) => {
    return (
        <li className="dd-menu-item" >
            {children}
        </li>
    )
}
