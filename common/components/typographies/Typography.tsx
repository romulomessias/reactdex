import React from 'react'
import clsx from 'clsx'

import './Typography.scss'

interface TypographyProps {
    className?: string
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'strong'
    variant?:
        | 'headline1'
        | 'headline2'
        | 'headline3'
        | 'headline4'
        | 'headline5'
        | 'headline6'
        | 'subtitle'
        | 'body1'
        | 'button'
        | 'caption'
        | 'overline'
    weight?: 'light' | 'normal' | 'medium' | 'strong'
}

const Typography: React.FC<TypographyProps> = ({
    as,
    children,
    className,
    variant,
    weight,
    ...props
}) => {
    const rootClass = clsx('typography', className, variant, weight)
    return React.createElement(as!, { className: rootClass, ...props }, children)
}

Typography.defaultProps = {
    as: 'p',
    weight: 'normal',
    variant: 'body1'
}

export default Typography
