import CasinoIcon from '@mui/icons-material/Casino'
import GroupIcon from '@mui/icons-material/Group'
import LogoutIcon from '@mui/icons-material/Logout'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import { Drawer } from '@mui/material'
import { useAtomValue } from 'jotai'

import { MenuSection, MenuHeader } from './components'
import { sidebarAtom } from './Sidebar.state'
import Styled from './Sidebar.styles'
import { IMenuSection } from './Sidebar.types'


const menu: IMenuSection[] = [
    {
        items: [
            {
                title: 'Пользователи',
                link: '/users',
                icon: <GroupIcon htmlColor={'#374150'}/>
            },
            {
                title: 'Статистика',
                link: '/stats',
                icon: <QueryStatsIcon htmlColor={'#374150'}/>
            },
            {
                title: 'Игровой процесс',
                link: '/game-process',
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
        <Drawer variant={'permanent'}>
            
            <MenuHeader/>
            
            <Styled.MenuWrapper $width={sidebar.width}>
                {
                    menu.map((section) => (
                        <MenuSection
                            key={Math.random()}
                            items={section.items}
                        />
                    ))
                }
            </Styled.MenuWrapper>
        </Drawer>
    )
}

export default SideBar
