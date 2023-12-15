import { Box, IconButton, Typography } from '@mui/material'
import Chip from '@mui/material/Chip'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { EGameSetStatus, IGameSet } from '@tennis-stats/types'
import Styled from './GameSetsTable.styles'


interface IProps {
    gameSetList: IGameSet[]
    onRowClick?: (gameSet: IGameSet, setIndex: number) => void
    onCancelClick?: (gameSet: IGameSet, setIndex: number) => void
}

function GameSetsTable({ gameSetList, onRowClick, onCancelClick }: IProps) {
    
    const getStatusChip = (status: EGameSetStatus) => {
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
    
    const isShowCancelButton = (set: IGameSet) => {
        return onCancelClick && set.status === EGameSetStatus.READY_TO_START
    }
    
    
    return (
        <Box>
            {
                gameSetList.map((set, index) => (
                    <Styled.Row
                        direction={'row'}
                        status={set.status}
                        onClick={() => onRowClick?.(set, index + 1)}
                    >
                        <Box width={'80px'}>
                            <Typography variant={'overline'}>{index + 1} Сет</Typography>
                        </Box>
                        
                        <Box width={'160px'}>{getStatusChip(set.status)}</Box>
                        
                        <Box width={'70px'}>{set.setScore}</Box>
                        
                        <Box width={'30px'}>
                            {
                                isShowCancelButton(set) &&
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onCancelClick?.(set, index + 1)
                                    }}
                                >
                                    <HighlightOffIcon/>
                                </IconButton>
                            }
                        </Box>
                    </Styled.Row>
                ))
            }
        </Box>
    )
    
}

export default GameSetsTable