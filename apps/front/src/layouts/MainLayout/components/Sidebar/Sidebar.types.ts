import { ReactElement } from 'react'


export type IMenuLinkItem = {
    type: 'link'
    title: string
    link: string
    icon: ReactElement
}

export type IMenuComponentItem = {
    type: 'component',
    component: ReactElement
}

export type TMenuItem = IMenuLinkItem | IMenuComponentItem

export interface IMenuSection {
    items: TMenuItem[]
}