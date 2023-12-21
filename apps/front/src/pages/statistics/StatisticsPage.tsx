import { Box, Grid, Stack } from '@mui/material'
import { useAtomValue } from 'jotai'
import { useGamesTotalScoreQuery } from '../../core/api'
import DatePicker from './components/DatePicker/DatePicker'
import { dateRangeAtom } from './components/DatePicker/DatePicker.state'
import TotalScoreCard from './components/TotalScoreCard/TotalScoreCard'


export default function StatisticsPage() {
    
    const dateRange = useAtomValue(dateRangeAtom)
    
    const { data } = useGamesTotalScoreQuery(dateRange)
    
    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Stack mb={3} mt={1}>
                <DatePicker/>
            </Stack>
            
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 1, sm: 8, md: 12 }}
            >
                {
                    (data ?? []).map((item) => (
                        <Grid item xs={1} sm={4} md={4} key={Math.random()}>
                            <TotalScoreCard data={item}/>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
    
}