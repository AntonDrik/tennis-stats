import { Box } from '@mui/material'
import styled from 'styled-components'


interface IMenuWrapperProps {
    $width: number
}

const MenuWrapper = styled(Box)<IMenuWrapperProps>(
    {
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        transition: '.3s'
    },
    ({ $width }) => ({
        width: `${$width}px`
    })
)

export default {
    MenuWrapper
}