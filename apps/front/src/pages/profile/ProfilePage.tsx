import React from 'react'

import Typography from '@mui/material/Typography'
import StarsIcon from '@mui/icons-material/Stars'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import { useParams } from 'react-router-dom'
import { useProfileInfoQuery } from '../../core/api'
import { InfoSection, MiniCard } from '../../shared/components'
import RatingChart from './components/RatingChart/RatingChart'
import Stack from '@mui/material/Stack/Stack'
import WinPercentCard from './components/WinPercentCard/WinPercentCard'
import Box from '@mui/material/Box'


type TProfileParams = {
    id: string
}

function ProfilePage() {
    const params = useParams<TProfileParams>()
    
    const { data: profile } = useProfileInfoQuery(params?.id ?? 0)
    
    return (
        <React.Fragment>
            <Typography variant={'h1'} align={'center'} mb={4}>
                {profile?.user.fullName}
            </Typography>
            
            <Stack spacing={3}>
                {
                    profile?.user &&
                    <InfoSection
                        title={`Личный рейтинг (${Math.round(profile.user.rating)})`}
                        icon={<StarsIcon color={'warning'}/>}
                    >
                        <RatingChart user={profile.user}/>
                    </InfoSection>
                }
                
                {
                    profile &&
                    <InfoSection
                        title={'Статистика'}
                        icon={<AnalyticsIcon color={'info'}/>}
                    >
                        <Box
                            display={'grid'}
                            gridTemplateColumns={'repeat(2, 1fr)'}
                            gap={2}
                        >
                            <WinPercentCard {...profile.winPercent}/>
                            
                            <MiniCard
                                label={'Количество игр'}
                                value={profile.gamesCount}
                            />
                        </Box>

                    </InfoSection>
                }
            </Stack>
        
        </React.Fragment>
    )
    
}

export default ProfilePage