import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import styled from 'styled-components'


const PaperWrapper = styled(Paper)({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
})

const TableContainerWrapper = styled(TableContainer)({
    height: 'calc(100% - 51px)'
})

const TableWrapper = styled(Table)({
    width: '100%',
    overflow: 'auto'
})

const HeaderCell = styled(TableCell)({
    backgroundColor: '#fff',
    top: -2
})


export default {
    PaperWrapper,
    TableContainerWrapper,
    TableWrapper,
    HeaderCell
}