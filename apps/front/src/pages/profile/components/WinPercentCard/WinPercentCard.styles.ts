import { SxProps, Typography } from '@mui/material'
import styled from 'styled-components'


interface IProps {
    isPositive: boolean
}

const Subtitle = styled(Typography)<IProps>({
    fontSize: 13,
    lineHeight: 1,
    fontWeight: 700,
    opacity: 0.7
}, ({ isPositive }) => ({
    color: isPositive ? '#218358' : '#CE2C31'
}))

const IconStyles: SxProps = {
    fontSize: 40, marginLeft: '-10px!important'
}

export default {
    Subtitle,
    IconStyles
}