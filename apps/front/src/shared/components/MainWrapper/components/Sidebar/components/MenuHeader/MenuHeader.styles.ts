import { Stack } from '@mui/material'
import Button from '@mui/material/Button'
import styled from 'styled-components'

const BurgerButton = styled(Button)({
    minWidth: '40px',
    width: '40px',
    height: '40px',
    '&:hover': {
        backgroundColor: '#d1d5db'
    }
})

const ButtonWrapper = styled(Stack)({
    padding: '0.5rem 0.5rem 0 0.75rem'
})

export default {
    BurgerButton,
    ButtonWrapper
}