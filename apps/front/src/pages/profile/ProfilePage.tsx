import React from 'react'

import Typography from '@mui/material/Typography'
import StarsIcon from '@mui/icons-material/Stars'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import { useParams } from 'react-router-dom'
import useUserQuery from '../../core/api/usersApi/useUserQuery'
import { InfoSection } from '../../shared/components'
import RatingChart from './components/RatingChart/RatingChart'
import Stack from '@mui/material/Stack/Stack'



type TProfileParams = {
    id: string
}

function ProfilePage() {
    const params = useParams<TProfileParams>()
    
    const { data: user } = useUserQuery(params?.id ?? 0)
    
    return (
        <React.Fragment>
            <Typography variant={'h1'} align={'center'} mb={4}>
                {user?.fullName}
            </Typography>
            
            <Stack spacing={3}>
                {
                    user &&
                    <InfoSection
                        title={`Личный рейтинг (${Math.round(user.rating)})`}
                        icon={<StarsIcon color={'warning'}/>}
                    >
                        <RatingChart user={user}/>
                    </InfoSection>
                }
                
                
                {
                    user &&
                    <InfoSection
                        title={'Статистика'}
                        icon={<AnalyticsIcon color={'info'}/>}
                    >
                        <span>1</span>
                    </InfoSection>
                }
            </Stack>
        
        </React.Fragment>
    )
    
}

export default ProfilePage