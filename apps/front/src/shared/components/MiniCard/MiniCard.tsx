import Box from '@mui/material/Box'
import Styled from './MiniCard.styles'


interface IProps {
    label: string
    value: string | number
    width?: string | number
}

function InfoCard({ label, value, width }: IProps) {
    
    return (
        <Styled.Wrapper width={width}>
            <Styled.Title>{label}</Styled.Title>
            <Box height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Styled.ValueText>{value}</Styled.ValueText>
            </Box>
        </Styled.Wrapper>
    )
    
}

export default InfoCard