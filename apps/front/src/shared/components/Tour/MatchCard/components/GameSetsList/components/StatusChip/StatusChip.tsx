import Chip from '@mui/material/Chip'
import { EGameSetStatus } from '@tennis-stats/types'


interface IProps {
    status: EGameSetStatus
}

function StatusChip({ status }: IProps) {
    
    const getStatusChip = () => {
        switch (status) {
            case EGameSetStatus.READY_TO_START:
                return <Chip label={'Готов к старту'} color={'info'} size={'small'}/>
            
            case EGameSetStatus.IN_PROCESS:
                return <Chip label={'Идёт игра'} color={'info'} size={'small'}/>
            
            case EGameSetStatus.FINISHED:
                return <Chip label={'Завершен'} color={'success'} size={'small'}/>
            
            case EGameSetStatus.CANCELED:
                return <Chip label={'Отменён'} color={'error'} size={'small'}/>
            
            case EGameSetStatus.PENDING:
            default:
                return <Chip label={'В ожидании'} size={'small'}/>
        }
    }
    
    return getStatusChip()
}


export default StatusChip