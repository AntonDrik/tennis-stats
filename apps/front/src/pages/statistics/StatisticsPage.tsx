import { Box, Tab, Tabs, Typography } from '@mui/material'
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
            <Typography variant={'h3'} textAlign={'center'} mb={1}>
                Статистика
            </Typography>
            
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} mb={2}>
                <Tabs
                    value={value}
                    variant="fullWidth"
                    onChange={handleTabChange}
                >
                    <Tab label="Общая" value={1}/>
                    <Tab label="Парная" value={2}/>
                </Tabs>
            </Box>
            
            {value === 1 && <GeneralStatisticsTab/>}
            {value === 2 && <PairStatisticTab/>}
        </Page>
    )
}

export default StatisticsPage