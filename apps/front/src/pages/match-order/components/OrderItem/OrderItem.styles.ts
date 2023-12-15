import Stack from '@mui/material/Stack'
import styled from 'styled-components'
import theme from '../../../../theme/theme'


const Wrapper = styled(Stack)({
    backgroundColor: '#E6F4FE',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    width: '100%',
    paddingLeft: theme.spacing(3)
})


export default {
    Wrapper
}