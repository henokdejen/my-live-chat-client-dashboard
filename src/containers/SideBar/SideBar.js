import React from 'react'
import './sidebar.scss'
import { NavLink } from 'react-router-dom'

const menus = [
    {
        title: 'Chat', path: '/conversations'
    }, { title: 'Visitors', path: '/visitors' }]

export default function SideBar() {
    return (
        <div className="side-bar">
            {
                menus.map((menu, index) => (

                    <NavLink
                        to={menu.path}
                        key={index}
                        activeClassName = "active">
                        {menu.title}
                    </NavLink>
                ))
            }
        </div>
    )
}
