import Stack from '@mui/material/Stack'
import { styled } from 'styled-components'
import theme from '../../../../../../theme/theme'


const Wrapper = styled(Stack)({
    backgroundColor: '#EAE7EC',
    borderBottom: '1px solid #D0CDD7',
    
    alignItems: 'center',
    justifyContent: 'center',
    
    padding: theme.spacing(0.5),
    
    position: 'relative'
})


interface IProps {
    $withPadding: boolean
}

const TextWrapper = styled(Stack)<IProps>({
    textAlign: 'center',
    overflow: 'hidden',
    flex: 1
}, ({ $withPadding }) => ({
    paddingLeft: $withPadding ? '40px' : 0
}))


export default {
    Wrapper,
    TextWrapper
}