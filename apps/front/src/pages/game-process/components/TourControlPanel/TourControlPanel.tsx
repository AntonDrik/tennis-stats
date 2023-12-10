import CancelIcon from '@mui/icons-material/Cancel'
import { Chip, IconButton, Stack, Typography } from '@mui/material'
import { ETourStatus, ITour } from '@tennis-stats/types'
import format from 'date-fns/format'
import ruLocale from 'date-fns/locale/ru'
import parseISO from 'date-fns/parseISO'
import { useMemo } from 'react'
import Styled from './TourControlPanel.styles'


interface IProps {
    activeTour: ITour
}

function TourControlPanel({ activeTour }: IProps) {
    
    const formattedDate = () => {
        const parsedDate = parseISO(activeTour.date as unknown as string)
        
        return format(parsedDate, 'dd MMM yyyy HH:mm', { locale: ruLocale })
    }
    
    const status = useMemo(() => {
        switch (activeTour.status) {
            case ETourStatus.ACTIVE:
            default:
                return {
                    caption: 'Активный',
                    color: '#D5EFFF',
                    borderColor: '#8EC8F6',
                    textColor: '#0D74CE'
                }
            case ETourStatus.CANCELED:
                return {
                    caption: 'Отменен',
                    color: '#FFDCD3',
                    borderColor: '#F5A898',
                    textColor: '#D13415'
                }
            case ETourStatus.FINISHED:
                return {
                    caption: 'Завершен',
                    color: '#D6F1DF',
                    borderColor: '#8ECEAA',
                    textColor: '#218358'
                }
        }
    }, [activeTour.status])
    
    return (
        <Styled.Wrapper direction={'row'}>
            
            <Stack direction={'column'}>
                
                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                    <Typography variant={'h4'}>Тур: {activeTour.id}</Typography>
                    
                    <Chip
                        label={status.caption}
                        sx={{
                            backgroundColor: status.color,
                            color: status.textColor,
                            border: `1px solid ${status.borderColor}`
                        }}
                    />
                </Stack>
                
                
                <Typography
                    variant={'subtitle2'}
                    sx={{ opacity: 0.7, mt: 0.5 }}
                >
                    {formattedDate()}
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