import Stack from '@mui/material/Stack'
import theme from '../../../../theme/theme'
import { styled } from 'styled-components'

const Wrapper = styled(Stack)({
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    border: '1px solid #D0CDD7'
})

const Header = styled(Stack)({
    backgroundColor: '#EAE7EC',
    borderBottom: '1px solid #D0CDD7',
    
    alignItems: 'center',
    justifyContent: 'space-between',
    
    paddingBottom: theme.spacing(0.5),
    paddingTop: theme.spacing(0.5),
})


export default {
    Wrapper,
    Header
}