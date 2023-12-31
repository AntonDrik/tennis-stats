import React from 'react'
import { IMenuSection } from '../../Sidebar.types'
import MenuItem from '../MenuItem/MenuItem'
import Styled from './MenuSection.styles'


function MenuSection(props: IMenuSection) {
    
    return (
        <Styled.Wrapper>
            {
                props.items.map((menuItem) => {
                    if (menuItem.type === 'link') {
                        return (
                            <MenuItem
                                key={menuItem.title}
                                {...menuItem}
                            />
                        )
                    }
                    
                    return (
                        <React.Fragment key={Math.random()}>
                            {menuItem.component}
                        </React.Fragment>
                    )
                })
            }
        </Styled.Wrapper>
    )
}

export default MenuSection