import CasinoIcon from '@mui/icons-material/Casino'
import GroupIcon from '@mui/icons-material/Group'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import ListAltIcon from '@mui/icons-material/ListAlt'
import Divider from '@mui/material/Divider'
import { useSetAtom, useAtomValue } from 'jotai'
import React, { useEffect, useMemo } from 'react'
import { appRoutes } from '../../../../routes/routes.constant'

import { MenuSection, LogoutItem } from './components'
import { changeSidebarAtom, sidebarAtom } from './Sidebar.state'
import Styled from './Sidebar.styles'
import { IMenuSection } from './Sidebar.types'


function SideBar() {
    
    const sidebar = useAtomValue(sidebarAtom)
    const toggleSidebar = useSetAtom(changeSidebarAtom)
    
    const menuList: IMenuSection[] = useMemo(() => [
        {
            items: [
                {
                    type: 'link',
                    title: 'Список туров',
                    link: appRoutes.TOURS_LIST,
                    icon: <ListAltIcon htmlColor={'#374150'}/>
                },
                {
                    type: 'link',
                    title: 'Статистика',
                    link: appRoutes.STATS,
                    icon: <QueryStatsIcon htmlColor={'#374150'}/>
                },
                {
                    type: 'link',
                    title: 'Генератор очередности',
                    link: appRoutes.MATCH_ORDER,
                    icon: <CasinoIcon htmlColor={'#374150'}/>
                },
                {
                    type: 'link',
                    title: 'Пользователи',
                    link: appRoutes.USERS,
                    icon: <GroupIcon htmlColor={'#374150'}/>
                },
            ]
        },
        {
            items: [
                {
                    type: 'component',
                    component: <LogoutItem/>
                }
            ]
        }
    ], [])
    
    useEffect(() => {
        document.body.style.overflow = sidebar.isOpen ? 'hidden' : 'auto'
    }, [sidebar.isOpen])
    
    return (
        <Styled.Backdrop
            open={sidebar.isOpen}
            onClick={() => toggleSidebar(false)}
        >
            <Styled.MenuWrapper $isOpen={sidebar.isOpen}>
                {
                    menuList.map((section, index) => (
                        <React.Fragment key={Math.random()}>
                            {
                                index === menuList.length - 1 &&
                                <Divider sx={{ mt: 1 }}/>
                            }
                            
                            <MenuSection
                                key={Math.random()}
                                items={section.items}
                            />
                        </React.Fragment>
                    ))
                }
            </Styled.MenuWrapper>
        </Styled.Backdrop>
    )
}

export default SideBar
