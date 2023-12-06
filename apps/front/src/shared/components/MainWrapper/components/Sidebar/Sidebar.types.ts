import { ReactElement } from 'react'

export interface IMenuItem {
    title: string
    link: string
    icon: ReactElement
}

export interface IMenuSection {
    items: IMenuItem[]
}