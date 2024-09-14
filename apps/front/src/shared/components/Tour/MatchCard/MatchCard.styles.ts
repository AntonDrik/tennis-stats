import Stack from '@mui/material/Stack'
import theme from '../../../../theme/theme'
import { styled } from 'styled-components'


const Wrapper = styled(Stack)({
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    border: '1px solid #D0CDD7'
})


export default {
    Wrapper
}