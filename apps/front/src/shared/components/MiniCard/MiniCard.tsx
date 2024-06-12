import Box from '@mui/material/Box';
import Styled from './MiniCard.styles';


interface IProps {
  label: string;
  value: string | string[] | number;
  width?: string | number;
}

function InfoCard({ label, value, width }: IProps) {

  return (
    <Styled.Wrapper width={width}>
      <Styled.Title>{label}</Styled.Title>
      <Box height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexWrap={'wrap'}>
        {
          Array.isArray(value) ?
            value.map((item) => <Styled.ValueText mr={1}>{item}</Styled.ValueText>)
            : <Styled.ValueText>{value}</Styled.ValueText>
        }
      </Box>
    </Styled.Wrapper>
  );

}

export default InfoCard;
