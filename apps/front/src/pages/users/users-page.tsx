import { Alert, Box, List, ListItem, ListItemText, Typography } from '@mui/material'
import { IUser } from '@tennis-stats/types'
import { useGetAllUsers } from '../../core/api'


export default function UsersPage() {
    
    const { data: usersList, error } = useGetAllUsers()
    
    const getFullName = (user: IUser) => {
        return `${user.firstName} ${user.lastName}`
    }
    
    return (
        <Box>
            <Typography>Пользователи</Typography>
            
            {
                error &&
                <Alert severity={'error'}>{error.message}</Alert>
            }
            
            {
                usersList &&
                <List>
                    {
                        usersList.map((user) => (
                            <ListItem>
                                <ListItemText primary={getFullName(user)}/>
                            </ListItem>
                        ))
                    }
                </List>
            }
        </Box>
    )
    
}