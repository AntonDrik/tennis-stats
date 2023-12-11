import { Box } from '@mui/material'
import styled from 'styled-components'


interface IMenuWrapperProps {
    $isOpen: boolean
}

const MenuWrapper = styled(Box)<IMenuWrapperProps>(
    {
        transition: '.3s',
        position: 'absolute',
        marginTop: '55px',
        height: '100%',
        backgroundColor: '#F7F9F8',
        zIndex: 999
    },
    ({ $isOpen }) => ({
        left: $isOpen ? 0 : -200,
        paddingLeft: $isOpen ? '0.5rem' : 0,
        paddingRight: $isOpen ? '0.5rem' : 0,
    })
)

export default {
    MenuWrapper
}