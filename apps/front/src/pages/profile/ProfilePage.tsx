import Typography from '@mui/material/Typography'
import { useMeQuery } from '../../core/api'


function ProfilePage() {
    
    const { data: user, isLoading } = useMeQuery()
    
    return (
        <Typography>{user?.fullName}</Typography>
    )
    
}

export default ProfilePage