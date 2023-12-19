import styled from 'styled-components'
import theme from '../../theme/theme'


const Wrapper = styled.div({
    backgroundColor: '#F9FEFF',
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    width: '100%',
    padding: theme.spacing(3)
})


export default {
    Wrapper
}