import clsx from 'clsx'
import React from 'react'

import './Layout.scss'

interface LayoutProps {
    className?: string
}

const Layout: React.FC<LayoutProps> = ({ className, children }) => {
    const rootClass = clsx('layout__content', className)
    return (
        <article className="layout">
            <section className={rootClass}>{children}</section>
        </article>
    )
}

export default Layout
