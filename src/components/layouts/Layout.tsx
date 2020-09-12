import React from 'react'

import './Layout.scss'

const Layout: React.FC = ({ children }) => {
    return (
        <article className="layout">
            <section className="layout__content">{children}</section>
        </article>
    )
}

export default Layout
