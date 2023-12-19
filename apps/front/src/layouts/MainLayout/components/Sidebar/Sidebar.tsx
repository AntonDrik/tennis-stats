import CasinoIcon from '@mui/icons-material/Casino'
import GroupIcon from '@mui/icons-material/Group'
import LogoutIcon from '@mui/icons-material/Logout'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import ListAltIcon from '@mui/icons-material/ListAlt'
import Divider from '@mui/material/Divider'
import { useSetAtom, useAtomValue } from 'jotai'
import React, { useEffect } from 'react'
import { appRoutes } from '../../../../routes/routes.constant'

import { MenuSection } from './components'
import { changeSidebarAtom, sidebarAtom } from './Sidebar.state'
import Styled from './Sidebar.styles'
import { IMenuSection } from './Sidebar.types'
import Backdrop from '@mui/material/Backdrop'


const menu: IMenuSection[] = [
    {
        items: [
            {
                title: 'Список туров',
                link: appRoutes.TOURS_LIST,
                icon: <ListAltIcon htmlColor={'#374150'}/>
            },
            {
                title: 'Статистика',
                link: appRoutes.STATS,
                icon: <QueryStatsIcon htmlColor={'#374150'}/>
            },
            {
                title: 'Генератор очередности',
                link: appRoutes.MATCH_ORDER,
                icon: <CasinoIcon htmlColor={'#374150'}/>
            },
            {
                title: 'Пользователи',
                link: appRoutes.USERS,
                icon: <GroupIcon htmlColor={'#374150'}/>
            },
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
    const toggleSidebar = useSetAtom(changeSidebarAtom)
    
    useEffect(() => {
        document.body.style.overflow = sidebar.isOpen ? 'hidden' : 'auto'
    }, [sidebar.isOpen])
    
    return (
        <Backdrop
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                marginTop: '55px'
        }}
            open={sidebar.isOpen}
            onClick={() => toggleSidebar(false)}
        >
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
        </Backdrop>
    )
}

export default SideBar
