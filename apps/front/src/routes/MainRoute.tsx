import { Outlet } from 'react-router-dom'
import { MainWrapper } from '../shared/components'


function MainRoute() {
    
    return (
        <MainWrapper>
            <Outlet/>
        </MainWrapper>
    )
}

export default MainRoute