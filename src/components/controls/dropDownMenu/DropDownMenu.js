import React, { useState, useEffect } from 'react'
import classNames from 'classnames';

import './dropDownMenu.scss'

export const DropDownMenu = ({ children, trigger, placement }) => {
    const [showMenu, setshowMenu] = useState(false)
    const menuClasses = classNames('menu', {
        'topRight': placement === 'topRight',
        'topLeft': placement === 'topLeft',
        'bottomRight': placement === 'bottomRight',
        'bottomLeft': placement === 'bottomLeft',

    })

    const openMenu = (e) => {
        setshowMenu(true)
        document.addEventListener('click', closeMenu)
    }

    const closeMenu = (e) => {
        setshowMenu(false)
        document.removeEventListener('click', closeMenu)
    }

    return (
        <div className="drop-down-menu-wrapper">
            <span className="dd-triger" onClick={openMenu}>{trigger}</span>
            {showMenu && <ul className={menuClasses}>
                {children}
            </ul>}
        </div>
    )
}
