import { Stack, Typography } from '@mui/material'
import styled from 'styled-components'
import theme from '../../../theme/theme'


const Wrapper = styled(Stack)({
    backgroundColor: '#F0F0F0',
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius
})

const Title = styled(Typography)({
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 700
})

const ValueText = styled(Typography)({
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 700,
    color: '#60646C'
})

export default {
    Wrapper,
    Title,
    ValueText
}