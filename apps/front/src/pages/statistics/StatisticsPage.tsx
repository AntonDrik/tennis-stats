import { Stack } from '@mui/material'
import { useAtomValue } from 'jotai'
import { useUsersTotalScoreQuery } from '../../core/api'
import { Page } from '../../shared/components'
import DatePicker from './components/DatePicker/DatePicker'
import { dateRangeAtom } from './components/DatePicker/DatePicker.state'
import TotalScoreCard from './components/TotalScoreCard/TotalScoreCard'


export default function StatisticsPage() {
    
    const dateRange = useAtomValue(dateRangeAtom)
    
    const { data } = useUsersTotalScoreQuery(dateRange)
    
    return (
        <Page title={'Статистика'}>
            <Stack mb={3} mt={1}>
                <DatePicker/>
            </Stack>
            
            <Stack spacing={2} height={'100%'} overflow={'auto'}>
                {
                    (data ?? []).map((item) => (
                        <TotalScoreCard data={item}/>
                    ))
                }
            </Stack>
        </Page>
    )
    
}