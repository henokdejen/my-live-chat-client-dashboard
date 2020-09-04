import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ChatShell from '../shell/ChatShell'
import SideBar from '../SideBar/SideBar'
import VisitorShell from '../visitor/VisitorShell'
import './dashboard.scss'

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
