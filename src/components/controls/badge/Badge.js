import React from 'react'
import './badge.scss'

export const Badge = ({className, children}) => {
    return (
        <div className={`unseen-msgs-count ${className || ''}`}>
            {children}
        </div>
    )
}
