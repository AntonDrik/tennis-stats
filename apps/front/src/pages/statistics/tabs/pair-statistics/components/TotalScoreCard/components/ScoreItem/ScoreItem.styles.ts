import { Stack, Typography } from '@mui/material'
import styled from 'styled-components'
import theme from '../../../../../../../../theme/theme'

const Wrapper = styled(Stack)({
    width: '200px',
    alignItems: 'center'
})

const NamesWrapper = styled(Stack)({
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
})

const UserNameText = styled(Typography)({
    fontWeight: 700,
    marginLeft: theme.spacing(1),
    whiteSpace: 'nowrap'
})

const ScoreText = styled(Typography)({
    fontSize: 20,
    textAlign: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    color: '#5F6563'
})

export default {
    Wrapper,
    NamesWrapper,
    UserNameText,
    ScoreText
}