import { Chip } from '@mui/material'
import { ITour } from '@tennis-stats/types'
import { useCallback } from 'react'


interface IProps {
    tour: ITour
}

function TourStatusChip({ tour }: IProps) {
    
    const getStatusChip = useCallback(() => {
        if (tour.isActive) {
            return <Chip label={'Активный'} color={'info'}/>
        }
        
        return <Chip label={'Завершен'} color={'success'}/>
    }, [tour.isActive])
    
    return getStatusChip()
}

export default TourStatusChip