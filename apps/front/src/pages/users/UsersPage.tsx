import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper
} from '@mui/material'
import { useUsersQuery } from '../../core/api'


export default function UsersPage() {
    
    const { data: usersList } = useUsersQuery()
    
    return (
        <Box>
            <Typography variant="h4" sx={{mb: 2}}>Пользователи</Typography>
            
            {
                usersList &&
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Имя</TableCell>
                                <TableCell>Фамилия</TableCell>
                                <TableCell>Рейтинг</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                usersList.map((user) => (
                                    <TableRow
                                        key={user.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{user.firstName}</TableCell>
                                        <TableCell align="left">{user.lastName}</TableCell>
                                        <TableCell align="left">{Math.round(user.rating)}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Box>
    )
    
}
