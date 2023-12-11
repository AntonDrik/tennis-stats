import CancelIcon from '@mui/icons-material/Cancel'
import { Chip, IconButton, Stack, Typography } from '@mui/material'
import { ETourStatus, ITour } from '@tennis-stats/types'
import format from 'date-fns/format'
import ruLocale from 'date-fns/locale/ru'
import parseISO from 'date-fns/parseISO'
import Styled from './TourControlPanel.styles'


interface IProps {
    activeTour: ITour
}

function TourControlPanel({ activeTour }: IProps) {
    
    const formattedDate = () => {
        const parsedDate = parseISO(activeTour.date as unknown as string)
        
        return format(parsedDate, 'dd MMM yyyy HH:mm', { locale: ruLocale })
    }
    
    const getStatusChip = () => {
        switch (activeTour.status) {
            case ETourStatus.ACTIVE:
            default:
                return <Chip label={'Активный'} color={'info'}/>
            case ETourStatus.CANCELED:
                return <Chip label={'Отменен'} color={'error'}/>
            case ETourStatus.FINISHED:
                return <Chip label={'Завершен'} color={'success'}/>
        }
    }
    
    return (
        <Styled.Wrapper direction={'row'}>
            
            <Stack direction={'column'}>
                
                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                    <Typography variant={'h3'}>Тур: {activeTour.id}</Typography>
                    
                    {getStatusChip()}
                </Stack>
                
                
                <Typography
                    variant={'subtitle2'}
                    sx={{ opacity: 0.7, mt: 0.5 }}
                >
                    Начало тура: {formattedDate()}
                </Typography>
            </Stack>
            
            <Stack direction={'row'} spacing={1}>
                <IconButton size={'small'}>
                    <CancelIcon sx={{ color: '#E5484D' }}/>
                </IconButton>
            </Stack>
        
        </Styled.Wrapper>
    )
    
}

export default TourControlPanel