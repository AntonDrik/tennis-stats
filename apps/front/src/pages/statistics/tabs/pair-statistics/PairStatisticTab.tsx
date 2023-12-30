import { Stack } from '@mui/material'
import { useAtomValue } from 'jotai'
import { useUsersTotalScoreQuery } from '../../../../core/api'
import DatePicker from './components/DatePicker/DatePicker'
import { dateRangeAtom } from './components/DatePicker/DatePicker.state'
import TotalScoreCard from './components/TotalScoreCard/TotalScoreCard'


function PairStatisticTab() {
    
    const dateRange = useAtomValue(dateRangeAtom)
    const { data } = useUsersTotalScoreQuery(dateRange)

    return (
        <>
            <Stack mb={3} mt={1}>
                <DatePicker/>
            </Stack>
            
            <Stack spacing={2} height={'100%'} overflow={'auto'}>
                {
                    (data ?? []).map((item) => (
                        <TotalScoreCard
                            key={Math.random()}
                            data={item}
                        />
                    ))
                }
            </Stack>
        </>
    )
    
}

export default PairStatisticTab