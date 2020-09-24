import clsx from 'clsx'
import React from 'react'
import Typography from '../typographies/Typography'

import './MenuItem.scss'

interface MenuItemProps {
    className?: string
    activeClassName?: string
    isActive?: boolean
}

const MenuItem: React.FC<MenuItemProps> = ({
    children,
    className,
    activeClassName = '',
    isActive,
}) => {
    const rootClass = clsx('menu-item', className, {
        [activeClassName]: isActive,
    })
    return (
        <li className={rootClass}>
            <Typography as="span" variant="button">
                {children}
            </Typography>
        </li>
    )
}

MenuItem.defaultProps = {
    isActive: false,
    activeClassName: 'active',
}

export default MenuItem
