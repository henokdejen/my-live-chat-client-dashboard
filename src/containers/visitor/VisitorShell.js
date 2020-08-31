import React from 'react'
import { connect } from 'react-redux';
import { NavLink, useRouteMatch } from 'react-router-dom'
import { InnerHeader } from '../../components/controls/innerHeader/InnerHeader'
import { InnerNavHeader } from '../../components/controls/innerHeader/InnerNavHeader'
import { InnerNav } from '../../components/controls/innerNav/InnerNav'

import './visitorsShell.scss'
import { Card } from '../../components/controls/card/Card'
import Button from '../../components/controls/buttons/Button'


const VisitorNavItem = ({ to, children }) => {
    return (
        <NavLink to={to} className="visitor-nav-item " activeClassName="active">{children}</NavLink>
    )
}

const VisitorItem = ({visitor}) => {
    return (
        <div className="visitor-item">
            <div className="visitor-id">#{visitor.browserID}</div>
            <div className="visiting-site"><a href="#">https://dummy.url.fornow/#chatwindow_0-tab</a></div>
            <div className="actions"><Button>Start Chat</Button></div>
        </div>
    )
}

const menus = [
    {
        'name': 'Unassigned Visitors (18)',
        'path': 'unassigned'
    },
    {
        'name': 'Assigned Visitors (12)',
        'path': 'assigned'
    },
    {
        'name': 'All Visitors (30)',
        'path': 'all'
    },
]

const VisitorShell = ({getOnlineVisitors}) => {
    let { path } = useRouteMatch();

    let onlineVisitors = getOnlineVisitors()
    console.log('RECEIVED visitors', onlineVisitors)

    return (
        <div className="visitors-wrapper">
            <InnerNav className="visitors-nav">
                <InnerNavHeader>Visitors</InnerNavHeader>
                {
                    menus.map((menu, index) => {
                        return (
                            <VisitorNavItem
                                to={`${path}/${menu.path}`}
                                key={index}>
                                {menu.name}
                            </VisitorNavItem>
                        )
                    })
                }
            </InnerNav>

            <div className="visitors-list-wrapper">
                <InnerHeader><h4>All Visitors</h4></InnerHeader>
                <Card>
                    {
                        onlineVisitors.map(v => (
                            <VisitorItem key={v.browserID} visitor={v}/>
                        ))
                    }
                </Card>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    let props = {
        getOnlineVisitors: () => (state.visitorsState.onlineVisitors)
    };
    return props
};


export default connect(mapStateToProps)(VisitorShell);