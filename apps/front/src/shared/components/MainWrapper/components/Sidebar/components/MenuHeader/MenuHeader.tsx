import MenuIcon from '@mui/icons-material/Menu'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useAtomValue, useSetAtom } from 'jotai'
import Styled from './MenuHeader.styles'
import { changeSidebarAtom, sidebarAtom } from '../../Sidebar.state'


function MenuHeader() {
    
    const sidebar = useAtomValue(sidebarAtom)
    const toggleSidebar = useSetAtom(changeSidebarAtom)
    
    const getIcon = () => {
        if (!sidebar.isOpen) {
            return <MenuIcon htmlColor={'#374150'}/>
        }
        
        return <ArrowBackIosNewIcon htmlColor={'#374150'}/>
    }
    
    return (
        <Styled.ButtonWrapper>
            <Styled.BurgerButton onClick={toggleSidebar}>
                {getIcon()}
            </Styled.BurgerButton>
        </Styled.ButtonWrapper>
    )
    
}

export default MenuHeader