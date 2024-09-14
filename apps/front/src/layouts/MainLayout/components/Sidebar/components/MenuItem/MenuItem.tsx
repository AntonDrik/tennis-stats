import { useAtomValue } from 'jotai'
import { useLocation, useNavigate } from 'react-router-dom'

import { sidebarAtom } from '../../Sidebar.state'
import { IMenuLinkItem } from '../../Sidebar.types'
import Styled from './MenuItem.styles'


function MenuItem({ title, link, icon }: IMenuLinkItem) {
    const navigate = useNavigate()
    const location = useLocation()
    
    const sidebar = useAtomValue(sidebarAtom)
    
    const isSelected = location.pathname.includes(link)
    
    const handleClick = () => {
        navigate(link)
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