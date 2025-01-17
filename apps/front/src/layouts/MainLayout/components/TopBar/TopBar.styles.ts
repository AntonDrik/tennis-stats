import { Stack } from '@mui/material'
import Button from '@mui/material/Button'
import styled from 'styled-components'
import theme from '../../../../theme/theme'


const Wrapper = styled(Stack)({
    position: 'fixed',
    left: 0,
    right: 0,
    height: '55px',
    backgroundColor: '#F7F9F8',
    zIndex: 999,
    borderBottom: '1px solid #D7DAD9',
    
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
    padding: theme.spacing(1)
})

const BurgerButton = styled(Button)({
    minWidth: '40px',
    width: '40px',
    height: '40px',
    '&:hover': {
        backgroundColor: theme.palette.primary.main
    }
})

export default {
    Wrapper,
    BurgerButton
}