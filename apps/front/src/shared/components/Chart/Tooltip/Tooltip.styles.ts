import { Stack, styled } from '@mui/material'
import Box from '@mui/material/Box'


const Wrapper = styled(Box)(() => ({
    padding: 16,
    backgroundColor: '#f0f0f0db',
    border: '1px solid #D9D9D9',
    borderRadius: 6,
    minWidth: 150
}))

const Item = styled(Stack)(() => ({
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 30
}))

export default {
    Wrapper,
    Item
}