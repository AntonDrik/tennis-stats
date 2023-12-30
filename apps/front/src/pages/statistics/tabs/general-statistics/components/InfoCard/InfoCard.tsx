import Styled from './InfoCard.styles'


interface IProps {
    label: string
    value: string | number
    width?: string | number
}

function InfoCard({ label, value, width }: IProps) {
    
    return (
        <Styled.Wrapper width={width}>
            <Styled.Title>{label}</Styled.Title>
            <Styled.ValueText>{value}</Styled.ValueText>
        </Styled.Wrapper>
    )
    
}

export default InfoCard