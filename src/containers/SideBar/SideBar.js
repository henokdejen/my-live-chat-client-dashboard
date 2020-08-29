import React from 'react'
import './sidebar.scss'
import { NavLink } from 'react-router-dom'
import {BsChatFill, BsFillPeopleFill} from 'react-icons/bs'
const menus = [
    {
        title: 'Chat', icon: <BsChatFill/>, path: '/conversations'
    }, { title: 'Visitors', icon: <BsFillPeopleFill/>, path: '/visitors' }]

export default function SideBar() {
    return (
        <div className="side-bar">
            {
                menus.map((menu, index) => (

                    <NavLink
                        to={menu.path}
                        key={index}
                        className="nav-item"
                        activeClassName = "active">
                        {menu.icon} {menu.title}
                    </NavLink>
                ))
            }
        </div>
    )
}
