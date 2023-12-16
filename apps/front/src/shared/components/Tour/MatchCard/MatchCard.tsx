import { JSX } from 'react'
import Styled from './MatchCard.styles'


interface IProps {
    children: JSX.Element | JSX.Element[]
}

function MatchCard({ children }: IProps) {
    
    return (
        <Styled.Wrapper>
            {children}
        </Styled.Wrapper>
    )
    
}

export default MatchCard