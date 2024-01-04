import Box from '@mui/material/Box'
import { useRatingHistoryQuery, useAllGamesStatsQuery } from '../../../../core/api'
import Chart from './components/Chart/Chart'
import InfoCard from './components/InfoCard/InfoCard'
import Section from './components/Section/Section'
import StarsIcon from '@mui/icons-material/Stars'
import InfoIcon from '@mui/icons-material/Info'
import Stack from '@mui/material/Stack'


function GeneralStatisticsTab() {
    
    const ratingQuery = useRatingHistoryQuery()
    const gamesStatsQuery = useAllGamesStatsQuery()
    
    return (
        <Box width={'100%'} height={'100%'}>
            
            <Stack spacing={3}>
                {
                    (ratingQuery.data && ratingQuery.data.length > 0) &&
                    <Section title={'Рейтинг'} icon={<StarsIcon color={'warning'}/>}>
                        <Chart data={ratingQuery.data}/>
                    </Section>
                }
    
                {
                    gamesStatsQuery.data &&
                    <Section title={'Данные по всем играм'} icon={<InfoIcon color={'info'}/>}>
                        <Box
                            display={'grid'}
                            gridTemplateColumns={'repeat(2, 1fr)'}
                            gap={2}
                        >
                            <InfoCard
                                label={'Сыграно игр'}
                                value={gamesStatsQuery.data.gamesCount}
                            />

                            <InfoCard
                                label={'Сыграно допов'}
                                value={gamesStatsQuery.data.additionsCount}
                            />

                            <InfoCard
                                label={'Самый популярный счет'}
                                value={gamesStatsQuery.data.mostPopularScore}
                            />

                            <InfoCard
                                label={'Средняя разница в счёте'}
                                value={Math.round(gamesStatsQuery.data.avgScoreDifference)}
                            />

                        </Box>
                    </Section>
                }
                
            </Stack>
        
        </Box>
    )
    
}

export default GeneralStatisticsTab