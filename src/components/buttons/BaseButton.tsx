import clsx from 'clsx'
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import './BaseButton.scss'

type Props = React.HTMLProps<HTMLButtonElement>

const BaseButton: React.FC<Props> = ({ className, children, ...props }) => {
    const rootClass = clsx('base-button', className)
    return (
        <button {...props} className={rootClass} type="button">
            {children}
        </button>
    )
}

export default BaseButton
