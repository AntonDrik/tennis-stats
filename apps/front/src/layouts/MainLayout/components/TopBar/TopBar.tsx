import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu'
import Stack from '@mui/material/Stack';
import { useAtomValue, useSetAtom } from 'jotai'
import { changeSidebarAtom, sidebarAtom } from '../Sidebar/Sidebar.state'
import ProfileAvatar from './components/Avatar/Avatar'
import BackButton from './components/BackButton/BackButton'
import Styled from './TopBar.styles'


function TopBar() {
    
    const sidebar = useAtomValue(sidebarAtom)
    const toggleSidebar = useSetAtom(changeSidebarAtom)
    
    const getIcon = () => {
        if (sidebar.isOpen) {
            return <CloseIcon htmlColor={'#374150'}/>
        }
        
        return <MenuIcon htmlColor={'#374150'}/>
    }
    
    const handleClick = () => {
        if (sidebar.isOpen) {
            toggleSidebar(false)
            
            return
        }
        
        toggleSidebar(true)
    }
    
    return (
        <Styled.Wrapper>
            <Styled.BurgerButton onClick={handleClick}>
                {getIcon()}
            </Styled.BurgerButton>
            
            <Stack direction={'row'} spacing={2}>
                <BackButton/>
                <ProfileAvatar/>
            </Stack>
        </Styled.Wrapper>
    )
    
}

export default TopBar