import { Chip, Stack, Typography } from '@mui/material'
import { ITour } from '@tennis-stats/types'
import { useCallback } from 'react'
import TourStatusChip from '../../../StatusChip/StatusChip'


interface IProps {
    tour: ITour
}

function TourLabel({ tour }: IProps) {
    
    return (
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Typography variant={'h3'}>Тур: {tour.id}</Typography>
            
            <TourStatusChip tour={tour}/>
        </Stack>
    )
    
}

export default TourLabel