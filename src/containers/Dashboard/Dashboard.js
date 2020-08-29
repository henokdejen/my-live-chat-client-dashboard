import React from 'react'
import './dashboard.scss'
import SideBar from '../SideBar/SideBar'
import ChatShell from '../shell/ChatShell'
import { Switch, Route, Redirect } from 'react-router-dom'
import { VisitorShell } from '../visitor/VisitorShell'

export const Dashboard = () => {
    return (
        <div className="main-container">
            <div className="side-bar-wrapper">
                <SideBar />
            </div>
            <div className="main-section-wrapper">
                <Switch>
                    <Route path="/conversations" name="conversations Page" render={props => <ChatShell {...props} />} />
                    <Route path="/visitors" name="visitors Page" render={props => <VisitorShell {...props} />} />
                </Switch>
            </div>
        </div>
    )
}
