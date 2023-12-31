import { Box, Tab, Tabs } from '@mui/material'
import { useState, SyntheticEvent } from 'react'
import { Page } from '../../shared/components'
import GeneralStatisticsTab from './tabs/general-statistics/GeneralStatisticsTab'
import PairStatisticTab from './tabs/pair-statistics/PairStatisticTab'


function StatisticsPage() {
    
    const [value, setValue] = useState(1)
    
    function handleTabChange(event: SyntheticEvent, newTabIndex: number) {
        setValue(newTabIndex)
    }
    
    return (
        <Page title={'Статистика'}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} mb={4}>
                <Tabs
                    value={value}
                    variant="fullWidth"
                    onChange={handleTabChange}
                >
                    <Tab label="Общая статистика" value={1}/>
                    <Tab label="Парная статистика" value={2}/>
                </Tabs>
            </Box>
            
            {value === 1 && <GeneralStatisticsTab/>}
            {value === 2 && <PairStatisticTab/>}
        </Page>
    )
}

export default StatisticsPage