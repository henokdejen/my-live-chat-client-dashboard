import React from 'react'
import './innerHeader.scss'

export const InnerHeader = ({children}) => {
    return (
        <header className="inner-header">
            {children}
        </header>
    )
}