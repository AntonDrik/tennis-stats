import { Box, Typography } from '@mui/material'
import styled from 'styled-components'
import theme from '../../../../../../../theme/theme'


interface IWrapperProps {
    $isSelected: boolean
}

const Wrapper = styled(Box)<IWrapperProps>(
    {
        display: 'flex',
        alignItems: 'center',
        height: '3rem',
        marginTop: '0.5rem',
        paddingLeft: '0.75rem',
        paddingRight: '0.75rem',
        borderRadius: '0.25rem',
        width: '100%',
        cursor: 'pointer',
    },
    ({ $isSelected }) => ({
        backgroundColor: $isSelected ? theme.palette.primary.main : 'inherit',
        
        '&:hover': {
            backgroundColor: theme.palette.primary[$isSelected ? 'main' : 'light']
        }
    })
)

const IconWrapper = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    marginRight: 10
})

const Link = styled(Typography)({
    marginLeft: 'marginLeft: 0.5rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    fontWeight: 500,
    whiteSpace: 'nowrap'
})

export default {
    Wrapper,
    Link,
    IconWrapper
}