import React from 'react'
import './sidebar.scss'

const menus = ['Chat', 'Agents', 'Bla', 'Bla']

export default function SideBar() {
    return (
        <ul className="side-bar">
            {
                menus.map((menu, index) => (
                    <li
                        className={index === 0 ? 'active' : ''}
                        key={index}
                    >{menu}</li>
                ))
            }
        </ul>
    )
}
