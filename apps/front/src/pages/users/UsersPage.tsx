import { Alert } from '@mui/material'
import {
    Box,
    IconButton,
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
    
    const { data: usersList, error } = useUsersQuery()
    
    return (
        <Box>
            <Typography variant="h4" gutterBottom>Пользователи</Typography>
            
            {
                error &&
                <Alert severity={'error'}>{error.message}</Alert>
            }
            
            {
                usersList &&
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Игроки</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                usersList.map((user) => (
                                    <TableRow
                                        key={user.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">
                                            <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                //onClick={() => setOpen(!open)} - типо по клику можно открывать статистику =)
                                            >
                                                {/*{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}*/}
                                            </IconButton>
                                            {user.fullName}</TableCell>
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
