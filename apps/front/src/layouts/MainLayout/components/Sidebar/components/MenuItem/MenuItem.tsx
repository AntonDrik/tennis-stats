import { useAtomValue, useSetAtom } from 'jotai'
import { useLocation, useNavigate } from 'react-router-dom'

import { changeSidebarAtom, sidebarAtom } from '../../Sidebar.state'
import { IMenuItem } from '../../Sidebar.types'
import Styled from './MenuItem.styles'


function MenuItem({ title, link, icon }: IMenuItem) {
    const navigate = useNavigate()
    const location = useLocation()
    
    const sidebar = useAtomValue(sidebarAtom)
    const toggleSidebar = useSetAtom(changeSidebarAtom)
    
    const isSelected = location.pathname.includes(link)
    
    const handleClick = () => {
        navigate(link)
        toggleSidebar(false)
    }
    
    return (
        <Styled.Wrapper
            $isSelected={isSelected}
            onClick={handleClick}
        >
            <Styled.IconWrapper>
                {icon}
            </Styled.IconWrapper>
            
            {
                sidebar.isOpen &&
                <Styled.Link>{title}</Styled.Link>
            }
        
        </Styled.Wrapper>
    )
    
}

export default MenuItem