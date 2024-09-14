import { Stack } from '@mui/material'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'


const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: '16px',
    width: '100%',
    backgroundColor: '#F9F9F9',
    borderBottomRightRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
    gap: theme.spacing(3),
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
        padding: '12px'
    }
}))

const Item = styled(Stack)<{ skipclick: boolean }>(({ skipclick }) => ({
    alignItems: 'center',
    cursor: !skipclick ? 'pointer' : 'auto',
    ...!skipclick && {
        '&:hover': {
            opacity: 0.5
        }
    }
}))

export default {
    Wrapper,
    Item
}