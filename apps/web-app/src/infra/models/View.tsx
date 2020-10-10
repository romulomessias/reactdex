import React, { DOMAttributes, FC, HTMLProps, EventHandler } from 'react'

type EventKeys = keyof DOMAttributes<HTMLElement>

export interface View<P = {}> extends FC<P & HTMLProps<HTMLElement>> {
    events?: (on: OnEvent, props: P) => void
}

interface OnEvent {
    (event: EventKeys, idSelector: string, handle: EventHandler<any>): void
}

export function ViewFactory<P>(Component: View<P>) {
    const events: Partial<DOMAttributes<HTMLElement>> = {}
    const on: OnEvent = (event, idSelector, handle) => {
        //@ts-ignore
        events[event] = handle
    }

    const EnhancedComponent: FC<P> = props => {
        Component?.events?.(on, props)
        return <Component {...props} {...events} />
    }

    return EnhancedComponent
}
