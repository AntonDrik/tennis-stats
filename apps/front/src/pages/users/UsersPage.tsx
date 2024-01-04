import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Stack,
    Button
} from '@mui/material'
import { IUser } from '@tennis-stats/types'
import { useNavigate } from 'react-router-dom'
import { useUsersQuery } from '../../core/api'
import AddIcon from '@mui/icons-material/Add'
import { appRoutes } from '../../routes/routes.constant'
import { useModal } from '../../shared/components'
import CreateUserModal from './modals/CreateUserModal/CreateUserModal'


export default function UsersPage() {
    
    const { data: usersList } = useUsersQuery()
    
    const modal = useModal()
    const navigate = useNavigate()
    
    const handleNewUserClick = () => {
        modal.open(<CreateUserModal/>)
    }
    
    const handleRowClick = (user: IUser) => {
        navigate(appRoutes.PROFILE(user.id))
    }
    
    return (
        <Box>
            <Stack direction={'row'} alignItems={'center'} mb={2} gap={2}>
                <Typography variant="h4">Пользователи</Typography>
                <Button
                    variant={'contained'}
                    color={'success'}
                    size={'small'}
                    sx={{ minWidth: 40 }}
                    onClick={handleNewUserClick}
                >
                    <AddIcon/>
                </Button>
            </Stack>
            
            
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
                                        onClick={() => handleRowClick(user)}
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
