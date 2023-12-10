import { Box } from '@mui/material'
import styled from 'styled-components'


const Wrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: '0.75rem',
    borderBottom: '1px solid #A9DAED',
    
    '&:last-child': {
        borderBottom: 'none'
    }
})

export default {
    Wrapper
}