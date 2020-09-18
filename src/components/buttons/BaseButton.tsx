import clsx from 'clsx'
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import './BaseButton.scss'

interface BaseButtonProps {
    rounded?: boolean
    buttonSize?: 'normal' | 'small'
}

type Props = React.HTMLProps<HTMLButtonElement> & BaseButtonProps

const BaseButton: React.FC<Props> = ({
    className,
    children,
    type,
    rounded,
    buttonSize,
    ...props
}) => {
    const rootClass = clsx('base-button', className, buttonSize, {
        rounded: rounded,
    })

    return (
        <button {...props} type="button" className={rootClass}>
            {children}
        </button>
    )
}

BaseButton.defaultProps = {
    rounded: false,
    buttonSize: 'normal',
}

export default BaseButton
