import React from 'react'
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

const VisitorItem = (props) => {
    return (
        <div className="visitor-item">
            <div className="visitor-id">#4213a74fa981723</div>
            <div className="visiting-site"><a href="#">https://dashboard.revechat.com/#chatwindow_0-tab</a></div>
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


export const VisitorShell = () => {
    let { path } = useRouteMatch();

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
                <InnerHeader><h4>Un Assigned Visitors</h4></InnerHeader>
                <Card>
                    {
                        [1, 2, 3, 4].map(v => (
                            <VisitorItem key={v}/>
                        ))
                    }
                </Card>
            </div>
        </div>
    )
}
