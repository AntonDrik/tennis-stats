import { Chip, Stack, Typography } from '@mui/material'
import { ETourStatus, ITour } from '@tennis-stats/types'
import { useCallback } from 'react'


interface IProps {
    tour: ITour
}

function TourLabel({ tour }: IProps) {
    
    const getStatusChip = useCallback(() => {
        switch (tour.status) {
            case ETourStatus.ACTIVE:
            default:
                return <Chip label={'Активный'} color={'info'}/>
            case ETourStatus.CANCELED:
                return <Chip label={'Отменен'} color={'error'}/>
            case ETourStatus.FINISHED:
                return <Chip label={'Завершен'} color={'success'}/>
        }
    }, [tour.status])
    
    return (
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Typography variant={'h3'}>Тур: {tour.id}</Typography>
            
            {getStatusChip()}
        </Stack>
    )
    
}

export default TourLabel