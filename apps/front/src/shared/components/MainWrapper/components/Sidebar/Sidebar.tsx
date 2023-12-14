import CasinoIcon from '@mui/icons-material/Casino'
import GroupIcon from '@mui/icons-material/Group'
import LogoutIcon from '@mui/icons-material/Logout'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import Divider from '@mui/material/Divider'
import { useAtomValue } from 'jotai'
import React from 'react'
import { EAppRoutes } from '../../../../../routes/routes.constant'

import { MenuSection } from './components'
import { sidebarAtom } from './Sidebar.state'
import Styled from './Sidebar.styles'
import { IMenuSection } from './Sidebar.types'


const menu: IMenuSection[] = [
    {
        items: [
            {
                title: 'Статистика',
                link: EAppRoutes.STATS,
                icon: <QueryStatsIcon htmlColor={'#374150'}/>
            },
            {
                title: 'Пользователи',
                link: EAppRoutes.USERS,
                icon: <GroupIcon htmlColor={'#374150'}/>
            },
            {
                title: 'Игровой процесс',
                link: EAppRoutes.GAME_PROCESS,
                icon: <SportsTennisIcon htmlColor={'#374150'}/>
            },
            {
                title: 'Генератор очередности',
                link: EAppRoutes.SEQUENCE_GENERATOR,
                icon: <CasinoIcon htmlColor={'#374150'}/>
            }
        ]
    },
    {
        items: [
            {
                title: 'Выйти',
                link: '/logout',
                icon: <LogoutIcon htmlColor={'#374150'}/>
            }
        ]
    }
]

function SideBar() {
    
    const sidebar = useAtomValue(sidebarAtom)
    
    return (
        <Styled.MenuWrapper $isOpen={sidebar.isOpen}>
            {
                menu.map((section, index) => (
                    <React.Fragment key={Math.random()}>
                        {
                            index === menu.length - 1 &&
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
    )
}

export default SideBar
