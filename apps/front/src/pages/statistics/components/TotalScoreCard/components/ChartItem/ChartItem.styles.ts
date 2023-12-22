import { Stack } from '@mui/material'
import Button from '@mui/material/Button'
import styled from 'styled-components'
import theme from '../../../../../../theme/theme'


interface IContentProps {
    $isOpen: boolean
}

const Content = styled(Stack)<IContentProps>(
    {
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.1s ease-in'
    },
    ({ $isOpen }) => ({
        height: $isOpen ? '100px' : '0px'
    })
)

const ButtonWrapper = styled(Button)({
    fontSize: 12,
    color: '#5F6563',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DFE2E0',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 14,
    padding: theme.spacing(0),
    '&:hover': {
        backgroundColor: '#DFE2E0',
    }
})

export default {
    ButtonWrapper,
    Content
}