import React from 'react'
import './dashboard.scss'
import SideBar from '../SideBar/SideBar'
import ChatShell from '../shell/ChatShell'

export const Dashboard = () => {
    return (
        <div className="main-container">
            <div className="side-bar-wrapper">
                <SideBar/>
            </div>
            <div className="main-section-wrapper">
                <ChatShell/>
            </div>
        </div>
    )
}
