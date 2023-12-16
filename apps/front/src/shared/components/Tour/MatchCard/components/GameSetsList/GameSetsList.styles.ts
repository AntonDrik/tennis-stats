import { Stack } from '@mui/material'
import { EGameSetStatus } from '@tennis-stats/types'
import { styled } from 'styled-components'


interface IRowProps {
    status: EGameSetStatus
}

const Row = styled(Stack)<IRowProps>(
    {
        alignItems: 'center',
        borderBottom: '1px solid #D9D9D9',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '8px',
        paddingBottom: '8px',
        
        '&:last-child': {
            borderBottom: 0
        }
    },
    ({ status }) => ({
        backgroundColor: status === EGameSetStatus.IN_PROCESS ? '#F1FAFD' : 'inherit'
    })
)

export default {
    Row
}