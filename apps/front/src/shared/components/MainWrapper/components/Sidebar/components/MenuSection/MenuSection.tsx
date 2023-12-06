import { IMenuSection } from '../../Sidebar.types'
import MenuItem from '../MenuItem/MenuItem'
import Styled from './MenuSection.styles'


function MenuSection(props: IMenuSection) {
    
    return (
        <Styled.Wrapper>
            {
                props.items.map((menuItem) => (
                    <MenuItem key={menuItem.title} {...menuItem}/>
                ))
            }
        </Styled.Wrapper>
    )
}

export default MenuSection