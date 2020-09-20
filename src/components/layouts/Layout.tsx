import clsx from 'clsx'
import React, { ReactElement } from 'react'

import './Layout.scss'

interface LayoutProps {
    className?: string
}

interface LayoutChildrenProps {
    slot?: 'header' | 'content' | 'sidebar' | 'footer' | 'navbar'
    className?: string
}

interface LayoutChildren {
    content?: React.ReactNode
    header?: React.ReactNode
    sidebar?: React.ReactNode
    navbar?: React.ReactNode
}

interface LayoutSidebarProps extends LayoutChildrenProps {
    // position: 'left' | 'right'
}

interface Layout extends React.FC<LayoutProps> {
    Content: React.FC<LayoutChildrenProps>
    Sidebar: React.FC<LayoutSidebarProps>
    Navbar: React.FC<LayoutSidebarProps>
    Header: React.FC<LayoutChildrenProps>
}

const mapChildren = (children: React.ReactNode) => (): LayoutChildren => {
    let mapped: LayoutChildren = {
        content: null,
    }

    React.Children.forEach(children, (child) => {
        try {
            const component = child as ReactElement<LayoutChildrenProps>
            if (component.props.slot) {
                // @ts-ignore
                mapped[component.props.slot] = component
            }
        } catch (e) {
            console.error(e)
        }
    })

    return mapped
}

const Layout: Layout = ({ className, children }) => {
    const rootClass = clsx('layout', className)
    const { content, header, navbar } = React.useMemo(mapChildren(children), [
        children,
    ])

    return (
        <main className={rootClass}>
            {header}
            <article className="layout__container">
                {navbar}
                {content}
            </article>
        </main>
    )
}

Layout.Content = ({ children, className }) => {
    const rootClass = clsx('layout__content', className)
    return (
        <section key="content" className={rootClass}>
            {children}
        </section>
    )
}

Layout.Content.defaultProps = {
    slot: 'content',
}

Layout.Navbar = ({ children, className, }) => {
    const rootClass = clsx('layout__navbar', className)
    return (
        <aside key="sidebar" className={rootClass}>
            {children}
        </aside>
    )
}

Layout.Navbar.defaultProps = {
    slot: 'navbar',
}



Layout.Sidebar = ({ children, className }) => {
    const rootClass = clsx('layout__sidebar', className)
    return (
        <aside key="sidebar" className={rootClass}>
            {children}
        </aside>
    )
}

Layout.Sidebar.defaultProps = {
    slot: 'sidebar',
}

Layout.Header = ({ children, className }) => {
    const rootClass = clsx('layout__header', className)
    return (
        <header key="header" className={rootClass}>
            {children}
        </header>
    )
}

Layout.Header.defaultProps = {
    slot: 'header',
}

export default Layout
