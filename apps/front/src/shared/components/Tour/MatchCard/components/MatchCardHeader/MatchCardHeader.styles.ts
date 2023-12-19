import Stack from '@mui/material/Stack'
import { styled } from 'styled-components'
import theme from '../../../../../../theme/theme'


const Header = styled(Stack)({
    backgroundColor: '#EAE7EC',
    borderBottom: '1px solid #D0CDD7',
    
    alignItems: 'center',
    justifyContent: 'space-between',
    
    paddingBottom: theme.spacing(0.5),
    paddingTop: theme.spacing(0.5),
})


export default {
    Header
}