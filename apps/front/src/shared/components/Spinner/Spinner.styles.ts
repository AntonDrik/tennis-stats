import { Stack } from '@mui/material'
import styled from 'styled-components'


const Wrapper = styled(Stack)({
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    zIndex: 1200
})

const PageWrapper = styled(Wrapper)(() => ({
    left: 0,
    right: 0,
    top: 0,
    transform: 'none'
}))

export default {
    Wrapper,
    PageWrapper
}