import LogoutIcon from '@mui/icons-material/Logout'
import { useAtomValue } from 'jotai'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../../../../../../../core/api'
import { appRoutes } from '../../../../../../../routes/routes.constant'
import { Spinner } from '../../../../../../../shared/components'
import { sidebarAtom } from '../../../Sidebar.state'
import Styled from '../../MenuItem/MenuItem.styles'


function LogoutItem() {
    const navigate = useNavigate()
    
    const { mutate, isLoading } = useLogoutMutation()
    
    const sidebar = useAtomValue(sidebarAtom)
    
    const handleClick = () => {
        mutate()
        navigate(appRoutes.LOGIN)
    }
    
    return (
        <Styled.Wrapper
            $isSelected={false}
            onClick={handleClick}
        >
            {isLoading && <Spinner/>}
            <Styled.IconWrapper>
                <LogoutIcon htmlColor={'#374150'}/>
            </Styled.IconWrapper>
            
            {
                sidebar.isOpen &&
                <Styled.Link>Выйти</Styled.Link>
            }
        
        </Styled.Wrapper>
    )
    
}

export default LogoutItem