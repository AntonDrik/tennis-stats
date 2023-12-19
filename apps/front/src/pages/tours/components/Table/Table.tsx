import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { parseISOWithFormat } from '@tennis-stats/helpers'
import { ITour } from '@tennis-stats/types'
import { useNavigate } from 'react-router-dom'
import { appRoutes } from '../../../../routes/routes.constant'
import { TourStatusChip } from '../../../../shared/components'


interface IProps {
    toursList: ITour[]
}

function ToursTable({ toursList }: IProps) {
    
    const navigate = useNavigate()
    
    const handleRowClick = (tour: ITour) => {
        navigate(appRoutes.TOUR_BY_ID(tour.id))
    }
    
    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Дата</TableCell>
                        <TableCell>№ Тура</TableCell>
                        <TableCell align={'center'}>Статус</TableCell>
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    {
                        toursList.map((tour) => (
                            <TableRow
                                key={tour.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={() => handleRowClick(tour)}
                            >
                                <TableCell>
                                    {parseISOWithFormat(tour.date, 'dd MMM yyyy HH:mm')}
                                </TableCell>
                                
                                <TableCell align={'center'}>{tour.id}</TableCell>
                                
                                <TableCell align={'center'}>
                                    <TourStatusChip tour={tour}/>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
    
}

export default ToursTable