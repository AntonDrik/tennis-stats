import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { parseISOWithFormat } from '@tennis-stats/helpers'
import { ITour } from '@tennis-stats/types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { appRoutes } from '../../../../routes/routes.constant'
import { TourStatusChip } from '../../../../shared/components'

import Styled from './Table.styles'

interface IProps {
    toursList: ITour[]
}

const ROWS_PER_PAGE = 20

function ToursTable({ toursList }: IProps) {
    
    const navigate = useNavigate()
    
    const [page, setPage] = useState(0)
    
    const handleRowClick = (tour: ITour) => {
        navigate(appRoutes.TOUR_BY_ID(tour.id))
    }
    
    return (
        <Styled.PaperWrapper elevation={0}>
            <Styled.TableContainerWrapper>
                <Styled.TableWrapper size="small" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <Styled.HeaderCell align={'center'}>№ Тура</Styled.HeaderCell>
                            <Styled.HeaderCell align={'center'}>Дата</Styled.HeaderCell>
                            <Styled.HeaderCell align={'center'}>Статус</Styled.HeaderCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        {
                            toursList
                                .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
                                .map((tour) => (
                                <TableRow
                                    key={tour.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    onClick={() => handleRowClick(tour)}
                                >
                                    <TableCell align={'center'} width={10}>{tour.id}</TableCell>
                                    
                                    <TableCell>
                                        {parseISOWithFormat(tour.date, 'dd MMM yyyy HH:mm')}
                                    </TableCell>
                                    
                                    <TableCell align={'center'}>
                                        <TourStatusChip tour={tour}/>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Styled.TableWrapper>
            </Styled.TableContainerWrapper>
            
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={toursList.length}
                rowsPerPage={ROWS_PER_PAGE}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
            />
        </Styled.PaperWrapper>
    
    )
    
}

export default ToursTable