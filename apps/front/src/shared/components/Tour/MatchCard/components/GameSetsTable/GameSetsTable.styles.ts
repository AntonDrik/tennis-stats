import MuiTableRow from '@mui/material/TableRow'
import { EGameSetStatus } from '@tennis-stats/types'
import { styled } from 'styled-components'


interface IRowProps {
    status: EGameSetStatus
}

const TableRow = styled(MuiTableRow)<IRowProps>(
    {
        '&:last-child td, &:last-child th': {
            border: 0
        }
    },
    ({ status }) => ({
        backgroundColor:
            status === EGameSetStatus.IN_PROCESS ? '#F1FAFD'
            : status === EGameSetStatus.FINISHED ? '#F5FBF5'
                : 'inherit'
    })
)

export default {
    TableRow
}