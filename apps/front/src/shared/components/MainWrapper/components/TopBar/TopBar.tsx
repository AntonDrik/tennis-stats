import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu'
import { useAtomValue, useSetAtom } from 'jotai'
import { changeSidebarAtom, sidebarAtom } from '../Sidebar/Sidebar.state'
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
            
            <BackButton/>
        </Styled.Wrapper>
    )
    
}

export default TopBar