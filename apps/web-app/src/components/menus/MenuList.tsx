import clsx from 'clsx'
import React from 'react'

import './MenuList.scss'

interface MenuListProps {
    className?: string
}

const MenuList: React.FC<MenuListProps> = ({ children, className }) => {
    const rootClass = clsx('menu-list', className)
    return <ul className={rootClass}>{children}</ul>
}

export default MenuList
