import { Stack, Typography } from '@mui/material'
import styled from 'styled-components'
import theme from '../../../../theme/theme'


const CardWrapper = styled(Stack)({
    backgroundColor: '#EEF1F0',
    border: '1px solid #DFE2E0',
    padding: theme.spacing(1),
    borderRadius: 14
})

const SecondaryText = styled(Typography)({
    fontSize: 14,
    color: '#5F6563'
})


export default {
    CardWrapper,
    SecondaryText
}