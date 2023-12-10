import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import MenuIcon from '@mui/icons-material/Menu'
import { useAtomValue, useSetAtom } from 'jotai'
import { changeSidebarAtom, sidebarAtom } from '../Sidebar/Sidebar.state'
import Styled from './TopBar.styles'


function TopBar() {
    
    const sidebar = useAtomValue(sidebarAtom)
    const toggleSidebar = useSetAtom(changeSidebarAtom)
    
    const getIcon = () => {
        if (!sidebar.isOpen) {
            return <MenuIcon htmlColor={'#374150'}/>
        }
        
        return <ArrowBackIosNewIcon htmlColor={'#374150'}/>
    }
    
    return (
        <Styled.Wrapper>
            <Styled.ButtonWrapper>
                <Styled.BurgerButton onClick={toggleSidebar}>
                    {getIcon()}
                </Styled.BurgerButton>
            </Styled.ButtonWrapper>
        </Styled.Wrapper>
    )
    
}

export default TopBar