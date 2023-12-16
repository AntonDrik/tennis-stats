import { Box, Stack, Typography } from '@mui/material'
import { EGameSetStatus, IGameSet } from '@tennis-stats/types'
import { ReactElement } from 'react'
import ScoreLabel from './components/ScoreLabel/ScoreLabel'
import StatusChip from './components/StatusChip/StatusChip'
import Styled from './GameSetsList.styles'


interface IProps {
    gameSetList: IGameSet[]
    renderMenuCell?: (gameSet: IGameSet) => ReactElement
}

function GameSetsList({ gameSetList, renderMenuCell }: IProps) {
    
    const getMenuCell = (set: IGameSet): ReactElement | null => {
        if (!renderMenuCell) {
            return null
        }
        
        if ([EGameSetStatus.READY_TO_START, EGameSetStatus.IN_PROCESS].includes(set.status)) {
            return renderMenuCell(set)
        }
        
        return null
    }
    
    return (
        <Box>
            {
                gameSetList.map((set) => (
                    <Styled.Row
                        key={set.id}
                        direction={'row'}
                        status={set.status}
                    >
                        <Box width={'80px'}>
                            <Typography variant={'overline'}>{set.number} Сет</Typography>
                        </Box>
                        
                        <Box width={'160px'}>
                            <StatusChip status={set.status}/>
                        </Box>
                        
                        <Box width={'70px'}>
                            <Stack direction={'row'}>
                                <ScoreLabel player={set.player1}/>
                                -
                                <ScoreLabel player={set.player2}/>
                            </Stack>
                        </Box>
                        
                        <Box width={'30px'}>
                            {getMenuCell(set)}
                        </Box>
                    </Styled.Row>
                ))
            }
        </Box>
    )
    
}

export default GameSetsList

