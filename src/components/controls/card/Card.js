import React from 'react'
import classNames from 'classnames';
import './card.scss'

export const Card = ({children, borderRadius}) => {
    const cn = classNames('lcard', {
        'showBorder': Boolean(borderRadius)
    })
    return (
        <div className={cn}>
            {children}
        </div>
    )
}

