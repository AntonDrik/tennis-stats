import Avatar from '@mui/material/Avatar'
import { useNavigate } from 'react-router-dom'
import { useMeQuery } from '../../../../../../core/api'
import { appRoutes } from '../../../../../../routes/routes.constant'
import { Spinner } from '../../../../../../shared/components'


function ProfileAvatar() {
    const navigate = useNavigate()
    
    const { data: user, isLoading } = useMeQuery()
    
    const handleClick = () => {
        navigate(appRoutes.PROFILE)
    }
    
    return (
        <Avatar
            onClick={handleClick}
        >
            {isLoading && <Spinner/>}
            {user?.firstName.substring(0, 1)}
        </Avatar>
    )
    
}

export default ProfileAvatar